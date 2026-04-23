# Hidden Thoughts API

Admin dashboard + ecommerce JSON API built with Node.js, Express, Pug, and MongoDB.

This project manages product catalog data for Hidden Thoughts, a creative ecommerce brand selling clothing, accessories, photography prints, and design-related goods.

You can add/delete products from the admin pages, then fetch the same catalog data from API endpoints in a React storefront.

## Quick Start
```bash
npm install
npm run dev
```

Open: `http://localhost:3000/admin`

## Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `SESSION_SECRET`: session signing secret
- `ADMIN_USERNAME`: admin login username
- `ADMIN_PASSWORD`: admin login password
- `CLIENT_ORIGIN`: allowed React frontend origin for CORS, for example `http://localhost:5173`

## Main Routes
- `/admin` dashboard
- `/admin/products` manage products
- `/api/products` products JSON
- `/api/products/:id` single product JSON
- `/api/categories` product categories JSON

## Product API Filters
- `/api/products?category=Clothing`
- `/api/products?featured=true`
- `/api/products?search=print`
