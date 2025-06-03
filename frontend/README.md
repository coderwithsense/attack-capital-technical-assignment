# Frontend

This folder contains the frontend of the application built with **Next.js** and **TypeScript**. It connects to the backend API for data and user interaction.

## Features:

* Built using Next.js 14
* TypeScript support
* Tailwind CSS for styling
* Client-side routing with pre-rendering (SSR/SSG)
* Environment variable support
* Clean structure for components and pages

## Folder Structure:

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── pages/              # Routes like index.tsx, auth/login, etc.
│   ├── components/         # Reusable UI components
│   ├── styles/             # Global styles (e.g., Tailwind CSS)
│   ├── utils/              # Helper functions or API clients
├── .env.local              # Environment variables
├── .gitignore
├── next.config.ts          # Next.js config
├── package.json
├── postcss.config.mjs
├── tailwind.config.js      # Tailwind setup (if added)
├── tsconfig.json
└── README.md
```

## Getting Started:

1. Navigate to the frontend folder:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Create a `.env.local` file in the root of `frontend/` and set variables like:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:

```
npm run dev
```

## Available Scripts:

* `npm run dev`: Starts local development server at `http://localhost:3000`
* `npm run build`: Builds the app for production
* `npm start`: Starts the production build
* `npm run lint`: Lints the code (if ESLint is configured)

## Notes:

* All public-facing routes are defined in the `src/pages` folder
* Use `NEXT_PUBLIC_` prefix for any env variable you need in the browser
* Customize Tailwind by editing `tailwind.config.js` (if added)

## Deployment:

Can be deployed to Vercel, Netlify, or any Node-based host. If using Vercel, connect the repo and it will auto-detect Next.js setup.
