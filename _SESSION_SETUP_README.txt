const session = require('express-session');
const MongoStore = require('connect-mongo');

// إعداد الجلسة (يجب إضافته في ملف server.js)
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'rimtoken-secret',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: 'mongodb+srv://rimtestmede:5LtiigJ5mUenlizO@cluster0.fioxlok.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0',
//     collectionName: 'sessions'
//   }),
//   cookie: { maxAge: 1000 * 60 * 60 * 24 }
// }));

// ضع الكود أعلاه في أعلى ملف server.js بعد تعريف المتغيرات
