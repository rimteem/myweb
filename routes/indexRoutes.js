 const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    let user = null;
    if (req.session && req.session.userId) {
        user = await User.findById(req.session.userId);
    }
    res.render('home', {
        pageTitle: res.__('siteTitle'),
        user: user ? { name: user.firstName } : null
    });
});

// Handle language change explicitly if needed beyond query param
router.get('/lang/:locale', (req, res) => {
    const { locale } = req.params;
    if (req.app.locals.i18n.getLocales().includes(locale)) {
        res.cookie('rimtoken-lang', locale, { maxAge: 900000, httpOnly: true });
    }
    res.redirect('back');
});

router.get('/sell-digital-currency', async (req, res) => {
    let user = null;
    if (req.session && req.session.userId) {
        user = await User.findById(req.session.userId);
    }
    res.render('sell-digital-currency', {
        user: user ? { name: user.firstName } : null,
        currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en'
    });
});

router.get('/wallet', async (req, res) => {
    let user = null;
    if (req.session && req.session.userId) {
        user = await User.findById(req.session.userId);
    }
    res.render('wallet', {
        user: user ? { name: user.firstName } : null,
        currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en'
    });
});

router.get('/trade', async (req, res) => {
    let user = null;
    if (req.session && req.session.userId) {
        user = await User.findById(req.session.userId);
    }
    res.render('trade', {
        user: user ? { name: user.firstName } : null,
        currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en'
    });
});

router.get('/payment-points', async (req, res) => {
    let user = null;
    if (req.session && req.session.userId) {
        user = await User.findById(req.session.userId);
    }
    res.render('payment-points', {
        user: user ? { name: user.firstName } : null,
        currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en'
    });
});

module.exports = router;