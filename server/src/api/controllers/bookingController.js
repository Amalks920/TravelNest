const { getAllBookingsHelper, getAllBookingsOfHelper } = require("../helpers/bookingHelper")


//owner
const getAllBookings=async (req,res,next)=>{
    const hotel_id=req.params.hotel_id
    try {
        const response=await getAllBookingsHelper(hotel_id)
        res.status(200).json({response})
    } catch (error) {
        res.status(404).json({error})
    }
}

//user
const getAllBookingsOfUser=async (req,res,next)=>{
    const user_id=req.params.user_id
    try {
        const response=await getAllBookingsOfHelper(hotel_id)
        res.status(200).json({response})
    } catch (error) {
        res.status(404).json({error})
    }
}


module.exports={
    getAllBookings,getAllBookingsOfUser
}