const { addCouponHelper, getAllCouponsOwnerHelper, getAllCoupnsOwnerLengthHelper, getAllCouponsUserHelper } = require("../helpers/couponHelper")


const addCoupon = async (req,res) => {
    try {
        const data=req.body
        console.log(data)
      
        const response = await addCouponHelper(data)
        res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

const getAllCouponsOwner= async (req,res) => {
try {
   const response=await getAllCouponsOwnerHelper()
   res.status(200).json({response})
} catch (error) {
    res.status(500).json({error})
}
}

const getAllCoupnsOwnerLength= async (req,res) => {
    try {
    
        const response=await getAllCoupnsOwnerLengthHelper()
        console.log(response)
        res.status(200).json({response})
    } catch (error) {
        res.status(500).json({error})
    }
}

const getAllCouponsUser = async (req,res)=>{
    try {
     const response=await getAllCouponsUserHelper()
     res.status(200).json({response})
    } catch (error) {
       res.status(500).json({error}) 
    }
}

module.exports={
    addCoupon,getAllCouponsOwner,
    getAllCoupnsOwnerLength,getAllCouponsUser
}
