const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {
    res.render('login', {
        user: req.session && req.session.userId ? { name: req.session.userName } : null,
        currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en'
    });
});

router.get('/register', (req, res) => {
    res.render('auth', {
        user: req.session && req.session.userId ? { name: req.session.userName } : null,
        currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en',
        error: null
    });
});

router.post('/login', async (req, res) => {
    const { loginUsername, loginPassword } = req.body;
    try {
        const user = await User.findOne({ username: loginUsername });
        if (!user) {
            return res.render('login', { error: req.__('invalidCredentials') || 'Invalid username or password.', currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en' });
        }
        const isMatch = await bcrypt.compare(loginPassword, user.password);
        if (!isMatch) {
            return res.render('login', { error: req.__('invalidCredentials') || 'Invalid username or password.', currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en' });
        }
        req.session.userId = user._id;
        req.session.isAuthenticated = true;
        res.redirect('/');
    } catch (err) {
        console.error('Login error:', err);
        res.render('login', { error: req.__('loginError') || 'An error occurred during login.', currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en' });
    }
});

router.post('/register', async (req, res) => {
    const { firstName, lastName, username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.render('auth', { error: 'كلمتا المرور غير متطابقتين.', user: null, currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en' });
    }
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.render('auth', { error: 'اسم المستخدم أو البريد الإلكتروني مستخدم بالفعل.', user: null, currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, username, email, password: hashedPassword });
        await user.save();
        console.log('تم تسجيل مستخدم جديد:', user);
        res.redirect('/login');
    } catch (err) {
        console.error('Registration error:', err);
        res.render('auth', { error: 'حدث خطأ أثناء التسجيل. حاول مرة أخرى.', user: null, currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en' });
    }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(200).render('logout-message', {
      message: 'You have been logged out successfully. You will be redirected to the homepage shortly.'
    });
  });
});

module.exports = router;