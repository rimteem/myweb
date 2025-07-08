require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const i18n = require('i18n');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/account');
const walletRoutes = require('./routes/wallet');

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Connection
mongoose.connect('mongodb+srv://rimtestmede:5LtiigJ5mUenlizO@cluster0.fioxlok.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// i18n Configuration
i18n.configure({
  locales: ['en', 'ar', 'zh', 'fr'],
  defaultLocale: process.env.DEFAULT_LOCALE || 'en',
  cookie: 'rimtoken-lang', // Cookie name to store language preference
  queryParameter: 'lang',    // Allow language change via query param e.g. /?lang=ar
  directory: path.join(__dirname, 'locales'),
  autoReload: true,         // Watch for changes in JSON files (dev only)
  syncFiles: true,          // Sync locale files (dev only)
  objectNotation: true,     // Allows for nested JSON if you prefer
});

// Middleware
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(i18n.init); // Initialize i18n middleware

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve DEX static files for iframe integration
app.use('/SwapOcean-DEX-main/SwapOcean-DEX-main', express.static(path.join(__dirname, 'public/SwapOcean-DEX-main/SwapOcean-DEX-main')));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to make language and translation function available in all templates
app.use((req, res, next) => {
  res.locals.currentLocale = req.getLocale();
  res.locals.getLocalizedPath = (path) => {
    // Basic logic, could be more sophisticated
    return `${path}?lang=${res.locals.currentLocale}`;
  }
  // The i18n.init middleware should make __ available as res.locals.__
  next();
});

// Middleware to set default language to English if not specified
app.use((req, res, next) => {
  // فرض اللغة الإنجليزية كلغة افتراضية عند فتح الموقع
  if (!req.cookies['rimtoken-lang']) {
    res.cookie('rimtoken-lang', 'en', { maxAge: 900000, httpOnly: true });
    req.setLocale('en');
    res.locals.currentLocale = 'en';
  }
  next();
});

// إعداد الجلسة
app.use(session({
  secret: process.env.SESSION_SECRET || 'rimtoken-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://rimtestmede:5LtiigJ5mUenlizO@cluster0.fioxlok.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0',
    collectionName: 'sessions'
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Routes
app.use('/', indexRoutes);
app.use('/', authRoutes); // Auth routes like /login, /register
app.use('/account', accountRoutes);
app.use('/wallet', walletRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).render('error', {
    message: req.__('Sorry, page not found!') || 'Sorry, page not found!',
    error: { status: 404 },
    user: req.user || null,
    currentLocale: req.getLocale ? req.getLocale() : (req.locale || 'en')
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    message: req.__('Something broke!') || 'Something broke!',
    error: { status: 500 },
    user: req.user || null,
    currentLocale: req.getLocale ? req.getLocale() : (req.locale || 'en')
  });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Default language: ${i18n.getLocale()}`);
});