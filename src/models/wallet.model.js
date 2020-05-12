const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  walletPrivateKey: {
    type: String,
    required: true,
    unique: true
  }
});

const wallet = new mongoose.model('Wallet', schema);

module.exports = wallet;
