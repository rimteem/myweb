const express = require('express');
const router = express.Router();
const User = require('../models/User');

// دعم مسارات /home و /index لتوجيهها للصفحة الرئيسية للحساب
router.get(['/home', '/index'], (req, res) => {
  res.redirect('/account');
});

// Middleware: تأكد من تسجيل الدخول (يمكنك تطويره لاحقاً)
function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.isAuthenticated) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

// تخصيص صفحة الحساب: جلب بيانات المستخدم وتمريرها للقالب
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    res.render('account', {
      user: user ? { name: user.firstName } : null
    });
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
});

router.get('/buy', ensureAuthenticated, (req, res) => {
  res.render('buy', {
    user: req.user,
    currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en'
  });
});

router.post('/buy', ensureAuthenticated, async (req, res) => {
  try {
    const amount = parseInt(req.body.amount, 10);
    if (amount > 0) {
      await User.findByIdAndUpdate(req.session.userId, { $inc: { balance: amount } });
      res.redirect('/account/wallet');
    } else {
      res.render('buy', {
        user: req.user,
        currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en',
        error: 'Invalid amount'
      });
    }
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
});

router.get('/sell', ensureAuthenticated, (req, res) => {
  res.render('sell', {
    user: req.user,
    currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en'
  });
});

router.post('/sell', ensureAuthenticated, async (req, res) => {
  try {
    const amount = parseInt(req.body.amount, 10);
    const user = await User.findById(req.session.userId);
    if (amount > 0 && user.balance >= amount) {
      await User.findByIdAndUpdate(req.session.userId, { $inc: { balance: -amount } });
      res.redirect('/account/wallet');
    } else {
      res.render('sell', {
        user: req.user,
        currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en',
        error: 'Invalid amount or insufficient balance'
      });
    }
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
});

router.get('/trade', ensureAuthenticated, (req, res) => {
  res.render('trade', {
    user: req.user,
    currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en'
  });
});

router.post('/trade', ensureAuthenticated, (req, res) => {
  res.render('trade', {
    message: 'Trade order submitted (demo only).',
    user: req.user,
    currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en'
  });
});

router.get('/wallet', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    res.render('wallet', {
      user: user,
      currentLocale: req.locale || (req.getLocale && req.getLocale()) || 'en'
    });
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
});

// Debug: طباعة حالة الجلسة في كل طلب
router.use((req, res, next) => {
  console.log('جلسة المستخدم:', req.session);
  next();
});

// صفحة معاينة رسالة الخطأ 404 (للاختبار فقط)
router.get('/preview-404', (req, res) => {
  res.status(404).render('error', {
    message: 'Sorry, page not found!',
    error: { status: 404 }
  });
});

// صفحة معاينة لوحة التحكم بدون تسجيل دخول (للاختبار فقط)
router.get('/preview', (req, res) => {
  res.render('account', { user: { name: 'زائر تجريبي' } });
});

module.exports = router;
