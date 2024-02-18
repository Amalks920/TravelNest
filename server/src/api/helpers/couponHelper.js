const couponModal=require('../models/couponModel')

const addCouponHelper=async (data)=>{
    try {

        const response=await couponModal.create(data)
        return response
        
    } catch (error) {
        throw error;
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



module.exports={
    addCouponHelper,getAllCouponsOwnerHelper,
    getAllCoupnsOwnerLengthHelper,getAllCouponsUserHelper
}