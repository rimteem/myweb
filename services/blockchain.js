const { ethers } = require('ethers');
const axios = require('axios');

// إعداد مزود شبكة Ethereum
const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL || 'https://eth.llamarpc.com');

// إنشاء محفظة جديدة
function createWallet() {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey
  };
}

// استرجاع الرصيد
async function getBalance(address) {
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

// توقيع وإرسال معاملة
async function sendTransaction(privateKey, to, amountEth) {
  const wallet = new ethers.Wallet(privateKey, provider);
  const tx = await wallet.sendTransaction({
    to,
    value: ethers.parseEther(amountEth)
  });
  return tx;
}

// سجل المعاملات (باستخدام Etherscan API)
async function getTransactionHistory(address) {
  const apiKey = process.env.ETHERSCAN_API_KEY;
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;
  const { data } = await axios.get(url);
  return data.result;
}

module.exports = {
  createWallet,
  getBalance,
  sendTransaction,
  getTransactionHistory
};
