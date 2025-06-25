const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Example: Pass data to your home page if needed
    res.render('home', {
        pageTitle: res.__('siteTitle') // Example of using i18n in routes
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


module.exports = router;