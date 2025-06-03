# Full Stack Assignment

This repository contains both the frontend and backend code for a full-stack web application.

## Project Structure:

```
.
├── backend/       # Node.js + Express API server
├── frontend/      # Next.js + TypeScript client app
├── .gitignore     # Root-level git ignore settings
└── README.md      # You are here
```

## Technologies Used:

* **Frontend:** Next.js, TypeScript, Tailwind CSS
* **Backend:** Node.js, Express
* **Communication:** REST APIs
* **Styling:** Tailwind (frontend)
* **State Management:** Local/Context (if used)
* **Environment Configs:** `.env`, `.env.local`

## Setup Instructions:

### 1. Clone the Repository

```
git clone <your-repo-url>
cd <repo-folder-name>
```

### 2. Set Up the Backend

```
cd backend
npm install
# configure .env with your DB and port
npm run dev
```

### 3. Set Up the Frontend

Open a new terminal:

```
cd frontend
npm install
# configure .env.local with API base URL
npm run dev
```

Frontend runs on `http://localhost:3000`
Backend runs on `http://localhost:5000` (or as set in `.env`)

## Notes:

* Backend serves as an API-only layer.
* Frontend fetches data from the backend using REST.
* Keep sensitive keys and tokens inside appropriate `.env` files.
* Make sure both apps are running in parallel during development.
