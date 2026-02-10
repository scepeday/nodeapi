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

## Main Routes
- `/admin` dashboard
- `/admin/services` manage services
- `/admin/team-members` manage team members
- `/api/services` services JSON
- `/api/team-members` team members JSON

