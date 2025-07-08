const express = require('express');
const router = express.Router();
const blockchain = require('../services/blockchain');

// إنشاء محفظة جديدة
router.get('/create', (req, res) => {
  const wallet = blockchain.createWallet();
  res.json(wallet);
});

// استرجاع الرصيد
router.get('/balance/:address', async (req, res) => {
  try {
    const balance = await blockchain.getBalance(req.params.address);
    res.json({ balance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// إرسال معاملة
router.post('/send', async (req, res) => {
  try {
    const { privateKey, to, amount } = req.body;
    const tx = await blockchain.sendTransaction(privateKey, to, amount);
    res.json(tx);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// سجل المعاملات
router.get('/history/:address', async (req, res) => {
  try {
    const history = await blockchain.getTransactionHistory(req.params.address);
    res.json(history);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
