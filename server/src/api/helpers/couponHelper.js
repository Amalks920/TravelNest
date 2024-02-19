const couponModal=require('../models/couponModel')

const addCouponHelper=async (data)=>{
    try {

        const response=await couponModal.create(data)
        return response
        
    } catch (error) {
        throw error;
    }
}

const getACouponByCodeHelper = async (couponCode) =>{
    try {
       const response=await couponModal.findOne({code:couponCode}) 
       return response;
    } catch (error) {
        res.status(500).json({error})
    }
}

const getAllCouponsOwnerHelper = async () =>{
    try {
        const response=await couponModal.find({})
        return response
    } catch (error) {
        throw error
    }
}

const getAllCoupnsOwnerLengthHelper = async () => {
    try {
      const response= await couponModal.find({})
      return response.length  
    } catch (error) {
        throw error
    }
}

const getAllCouponsUserHelper= async () =>{
    try {
        const response=await couponModal.find({})
        return response
    } catch (error) {
        throw error
    }
}

const changeCouponCountHelper = async (couponCode,valueToChange) => {
    try {
       const response=await couponModal.updateOne(
        {code:couponCode},
        {
            $inc:{
                maxRedemptions:valueToChange
            }
        }
       ) 

       return response

    } catch (error) {
        throw error
    }
}



module.exports={
    addCouponHelper,getAllCouponsOwnerHelper,
    getAllCoupnsOwnerLengthHelper,getAllCouponsUserHelper,
    getACouponByCodeHelper,changeCouponCountHelper
}