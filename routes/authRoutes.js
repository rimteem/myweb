const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth', { activeForm: 'login' });
});

router.get('/register', (req, res) => {
    res.render('auth', { activeForm: 'register' });
});

router.post('/login', (req, res) => {
    // Handle login logic (validate credentials, session, etc.)
    const { loginEmail, loginPassword } = req.body;
    console.log('Login attempt:', loginEmail, loginPassword);
    // For now, redirect home
    res.redirect('/');
});

router.post('/register', (req, res) => {
    // Handle registration logic (save user, hash password, etc.)
    const { firstName, lastName, regUsername, regEmail, regPassword, confirmPassword } = req.body;
    console.log('Registration attempt:', req.body);
    // For now, redirect to login
    if (regPassword !== confirmPassword) {
        // Handle error: passwords don't match
        return res.render('auth', { activeForm: 'register', error: res.__('passwordsDoNotMatch') }); // You'd add this key to your locale files
    }
    res.redirect('/login');
});

module.exports = router;