const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-url>/assignment01?retryWrites=true&w=majority';
const SESSION_SECRET = process.env.SESSION_SECRET || 'student-admin-secret';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';
const PRODUCT_CATEGORIES = ['Clothing', 'Accessories', 'Photography Prints', 'Design Goods', 'Creative Tools'];

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', CLIENT_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

function requireAdminLogin(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    return next();
  }

  res.redirect('/login');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildProductQuery(queryParams) {
  const query = {};

  if (queryParams.category) {
    query.category = queryParams.category;
  }

  if (queryParams.featured === 'true') {
    query.featured = true;
  }

  if (queryParams.search) {
    const searchRegex = new RegExp(escapeRegExp(queryParams.search), 'i');
    query.$or = [{ name: searchRegex }, { description: searchRegex }, { category: searchRegex }];
  }

  return query;
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });

app.get('/', (_req, res) => {
  res.render('home', {
    pageTitle: 'Hidden Thoughts API'
  });
});

app.get('/login', (req, res) => {
  if (req.session && req.session.isLoggedIn) {
    return res.redirect('/admin');
  }

  res.render('admin/login', {
    pageTitle: 'Admin Login',
    errorMessage: req.query.error ? 'Invalid username or password.' : ''
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    req.session.isLoggedIn = true;
    req.session.username = username;
    return res.redirect('/admin');
  }

  res.redirect('/login?error=1');
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.use('/admin', requireAdminLogin);

app.get('/admin', (_req, res) => {
  res.render('admin/dashboard', {
    pageTitle: 'Hidden Thoughts Admin'
  });
});

app.get('/admin/products', async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('admin/products', {
      pageTitle: 'Manage Products',
      products,
      categories: PRODUCT_CATEGORIES
    });
  } catch (error) {
    res.status(500).send('Unable to load products.');
  }
});

app.post('/admin/products', async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock, featured } = req.body;
    await Product.create({
      name,
      description,
      price: Number(price),
      category,
      imageUrl,
      stock: Number(stock),
      featured: featured === 'true'
    });
    res.redirect('/admin/products');
  } catch (error) {
    res.status(400).send('Unable to create product.');
  }
});

app.post('/admin/products/:id/delete', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  } catch (error) {
    res.status(400).send('Unable to delete product.');
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(buildProductQuery(req.query)).sort({ featured: -1, createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch products.' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Unable to fetch product.' });
  }
});

app.get('/api/categories', (_req, res) => {
  res.json(PRODUCT_CATEGORIES);
});
