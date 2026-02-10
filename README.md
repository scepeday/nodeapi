# Assignment 01 - Express Admin API

Node.js + Express admin dashboard with MongoDB-backed collections and JSON API endpoints.

## App Overview
This project is an admin-only website built with Express and Pug.  
There are no public-facing pages. The purpose of the app is to let an admin create and delete records, then expose those records through JSON API endpoints.

The app uses two MongoDB collections:
- `services`
- `teammembers`

Data flow:
1. Admin submits forms in server-rendered Pug pages.
2. Express routes receive form data and save it with Mongoose.
3. Admin pages re-render with updated collection data.
4. API routes return the same data as JSON for future frontend/API use.

## Features
- Admin dashboard rendered with Pug templates
- Manage `services` collection (add/delete)
- Manage `teammembers` collection (add/delete)
- API endpoint: `/api/services`
- API endpoint: `/api/team-members`
- Responsive custom CSS styling

## Pages and Routes
- `GET /admin`  
  Main dashboard with navigation to admin sections and API preview links.
- `GET /admin/services`  
  Shows form to add a service and list of existing services.
- `POST /admin/services`  
  Creates a new service document.
- `POST /admin/services/:id/delete`  
  Deletes a service document by id.
- `GET /admin/team-members`  
  Shows form to add a team member and list of existing team members.
- `POST /admin/team-members`  
  Creates a new team member document.
- `POST /admin/team-members/:id/delete`  
  Deletes a team member document by id.
- `GET /api/services`  
  Returns all service documents as JSON.
- `GET /api/team-members`  
  Returns all team member documents as JSON.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example` and update your MongoDB URI.
3. Run the app:
   ```bash
   npm run dev
   ```
4. Open:
   - `http://localhost:3000/admin`

## Environment Variables
- `PORT=3000`
- `MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority`

Example:
```env
MONGODB_URI=mongodb+srv://user_test:yourPassword@cluster0.yq0awof.mongodb.net/assignment1_db?retryWrites=true&w=majority&appName=Cluster0
```

## Collections (MongoDB Atlas)
Expected collection names:
- `services`
- `teammembers`

You can create/seed them using the queries in `database-queries.md` (or Atlas Data Explorer / Playground).

## Deployment URL
Add your deployed URL here:
- `https://<your-deployment-url>`
