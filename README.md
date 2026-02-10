# NodeAPI

Simple admin dashboard + JSON API built with Node.js, Express, Pug, and MongoDB.

This project is for managing two collections:
- `services`
- `teammembers`

You can add/delete records from the admin pages, then fetch the same data from API endpoints.

## Quick Start
```bash
npm install
npm run dev
```

Open: `http://localhost:3000/admin`

## .env
Create a `.env` file in the root:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/assignment1_db?retryWrites=true&w=majority&appName=Cluster0
```

## Main Routes
- `/admin` dashboard
- `/admin/services` manage services
- `/admin/team-members` manage team members
- `/api/services` services JSON
- `/api/team-members` team members JSON

## Seed Data
Use the queries in `database-queries.md` in MongoDB Atlas (Playground or Data Explorer shell).

## Deploy
Add your deployed URL here when ready.
