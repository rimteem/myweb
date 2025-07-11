# RimToken Web Platform

A multi-language web platform for managing digital assets, built with Node.js, Express, MongoDB, and EJS. The project features user authentication, wallet management, trading, and a responsive UI styled with custom CSS and Tailwind.

## Features
- User registration and login (EJS views)
- Multi-language support (English, Arabic, French, Chinese)
- Wallet management and trading pages
- Team page with member profiles
- Responsive design with custom and Tailwind CSS
- MongoDB integration via Mongoose
- Error handling and 404 pages

## Project Structure
```
├── bin/                  # Startup scripts
├── locales/              # Translation files (ar, en, fr, zh)
├── models/               # Mongoose models (e.g., User)
├── nodejs-tailwind/      # Tailwind CSS setup
├── public/               # Static assets (images, CSS, JS)
├── routes/               # Express route handlers
├── services/             # Service modules (e.g., blockchain)
├── views/                # EJS templates (home, auth, wallet, team, etc.)
├── server.js             # Main Express server
├── package.json          # Project metadata and dependencies
```

## Setup & Usage
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment:**
   - Create a `.env` file for secrets (see `.env.example` if available).
3. **Start the server:**
   ```sh
   npm start
   ```
   The app will run on [http://localhost:3001](http://localhost:3001) by default.

## Scripts
- `npm start` — Start the production server
- `npm run dev` — Start with nodemon for development

## Main Pages
- `/` — Home
- `/login` — Login
- `/register` — Registration
- `/wallet` — Wallet management
- `/trade` — Trading page
- `/team` — Team members

## Languages Supported
- English (`en`)
- Arabic (`ar`)
- French (`fr`)
- Chinese (`zh`)

## License
This project is for educational and demonstration purposes.
