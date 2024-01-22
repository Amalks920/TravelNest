const walletModel=require('../models/walletModel')


const createWalletHelper=(user_id)=>{
    return new Promise( async (resolve,reject)=>{
        try {
          const response= await  walletModel.create({user_id:user_id});
          resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}

const addToWalletHelper=(user_id,amount)=>{
    console.log(user_id,amount)
    return new Promise( async (resolve,reject)=>{
        try {
            const response=await walletModel.updateOne(
                {user_id},
                {
                        $inc:{
                            amount:amount
                        }
                    }
                )

                resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}


const userWalletDetailsHelper=(user_id) => {
    return new Promise( async (resolve,reject)=>{
      try {
        const response=await walletModel.findOne({user_id:user_id})
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

module.exports={
    createWalletHelper,addToWalletHelper,
    userWalletDetailsHelper
}