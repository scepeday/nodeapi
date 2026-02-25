const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const Service = require('./models/Service');
const TeamMember = require('./models/TeamMember');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-url>/assignment01?retryWrites=true&w=majority';

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
  res.redirect('/admin');
});

app.get('/admin', (_req, res) => {
  res.render('admin/dashboard', {
    pageTitle: 'Admin Dashboard'
  });
});

app.get('/admin/services', async (_req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.render('admin/services', {
      pageTitle: 'Manage Services',
      services
    });
  } catch (error) {
    res.status(500).send('Unable to load services.');
  }
});

app.post('/admin/services', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    await Service.create({
      name,
      description,
      price: Number(price)
    });
    res.redirect('/admin/services');
  } catch (error) {
    res.status(400).send('Unable to create service.');
  }
});

app.post('/admin/services/:id/delete', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.redirect('/admin/services');
  } catch (error) {
    res.status(400).send('Unable to delete service.');
  }
});

app.get('/admin/team-members', async (_req, res) => {
  try {
    const teamMembers = await TeamMember.find().sort({ createdAt: -1 });
    res.render('admin/team-members', {
      pageTitle: 'Manage Team Members',
      teamMembers
    });
  } catch (error) {
    res.status(500).send('Unable to load team members.');
  }
});

app.post('/admin/team-members', async (req, res) => {
  try {
    const { fullName, role, email } = req.body;
    await TeamMember.create({
      fullName,
      role,
      email
    });
    res.redirect('/admin/team-members');
  } catch (error) {
    res.status(400).send('Unable to create team member.');
  }
});

app.post('/admin/team-members/:id/delete', async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.redirect('/admin/team-members');
  } catch (error) {
    res.status(400).send('Unable to delete team member.');
  }
});

app.get('/api/services', async (_req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch services.' });
  }
});

app.get('/api/team-members', async (_req, res) => {
  try {
    const teamMembers = await TeamMember.find().sort({ createdAt: -1 });
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch team members.' });
  }
});
