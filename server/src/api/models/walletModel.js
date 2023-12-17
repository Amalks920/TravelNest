const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.ObjectId,
    ref:'User',
    required: true,
  },
 
    amount: {
      type: Number,
      required: true,
      default:0
    }

},
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }

);

module.exports = mongoose.model('Wallet', walletSchema);