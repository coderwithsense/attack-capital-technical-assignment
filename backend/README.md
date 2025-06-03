# Backend

This folder contains the backend of the application built with Node.js and Express.

## Features:

* Express server setup
* Structured project with routes, controllers, middleware, and models
* Environment variable support using `.env`
* API-based architecture for frontend integration

## Folder Structure:

```
backend/
├── src/
│   ├── config/         # DB and other configurations
│   ├── controllers/    # Logic for each route
│   ├── middleware/     # Custom middlewares (auth, error handling)
│   ├── models/         # Mongoose or DB models
│   ├── routes/         # Route definitions
│   └── app.js          # Main express app
├── .env                # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started:

1. Navigate to the backend folder:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the root of `backend/` and add your environment variables:

```
PORT=5000
DATABASE_URL=your_mongodb_or_other_db_uri
JWT_SECRET=your_jwt_secret
```

4. Run the development server:

```
npm run dev
```

## Available Scripts:

* `npm run dev`: Starts server with nodemon for live-reload
* `npm start`: Starts server normally (e.g., in production)

## Notes:

* Make sure MongoDB (or your database) is running before starting the server
* All API routes are defined inside `src/routes`
* Each route file maps to controller functions for clean separation of concerns
