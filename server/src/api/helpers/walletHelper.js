const walletModel = require("../models/walletModel");
const { Wallet, WalletHistory } = require("../models/walletModel");

const createWalletHelper = (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await walletModel.create({ user_id: user_id });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const addToWalletHelper = (user_id, amount) => {
  console.log(user_id, amount);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await walletModel.updateOne(
        { user_id },
        {
          $inc: {
            amount: amount,
          },
        }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const userWalletDetailsHelper = (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Wallet.findOne({ user_id: user_id });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const updateWalletAmountHelper = async (data) => {
  const { user_id, amount,type } = data;
  try {
    const response = await Wallet.findOneAndUpdate(
      { user_id: user_id },
      { $inc: { amount: amount } },
      { new: true }
    );

    await updateWalletHistoryHelper({_id:response._id,amount,type:type});

    return response;
  } catch (error) {
    return error;
  }
};

const updateWalletHistoryHelper = async ({_id,amount,type}) => {
    console.log(_id,amount,type)
  try {
    const historyEntry=new WalletHistory({
        wallet_id:_id,
        transaction_type:type,
        amount:amount
    });

    await historyEntry.save();
    console.log(historyEntry)
    console.log('history entry')
  } catch (error) {
    console.log(error)
    return error;
  }
};

const getWalletHistoryHelper=async (wallet_id)=>{
    try {
       const response=await WalletHistory.find({wallet_id:wallet_id})
       console.log(response)
       console.log('lsdjflds')
       return response
    } catch (error) {
        return error
    }
}

module.exports = {
  createWalletHelper,
  addToWalletHelper,
  userWalletDetailsHelper,
  updateWalletAmountHelper,
  updateWalletHistoryHelper,
  getWalletHistoryHelper
};
