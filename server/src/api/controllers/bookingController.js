const { getAllBookingsHelper, getAllBookingsOfHelper, getABookingForUserHelper, getABookingForOwnerHelper, changeBookingStatusHelper, cancelBookingHelper } = require("../helpers/bookingHelper")
const { getReviewDoneByUser } = require("../helpers/reviewHelper")
const { updateRoomNumberHelper } = require("../helpers/roomHelper")
const { addToWalletHelper } = require("../helpers/walletHelper")


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
        const response=await getAllBookingsOfHelper(user_id)
        res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(404).json({error})
    }
}

const getABookingForUser=async (req,res,next)=>{
    const booking_id=req.params.booking_id;
    const user_id=req.query.user_id;

    try {
        const response=await getABookingForUserHelper(booking_id)
        const reviewResponse=await getReviewDoneByUser(booking_id,user_id)
        res.status(200).json({response,reviewResponse})
    } catch (error) {
        res.status(404).json({error})
    }
}

const getABookingForOwner=async (req,res,next)=>{
    const booking_id=req.params.booking_id;
    try {
       const response= await getABookingForOwnerHelper(booking_id)
       res.status(200).json({response})
    } catch (error) {
       res.status(404).json({error}) 
    }
}

const changeBookingStatus=async (req,res,next)=>{
    const booking_id=req.params.booking_id;
    const status=req.body.status
    console.log(req.body)
    const totalNoOfRooms=req.body.totalNoOfRooms;
    try {
        const response= await changeBookingStatusHelper(booking_id,status);
        console.log(response)
        res.status(200).json({response})
    } catch (error) {
        res.status(404).json({error})
    }
}

const cancelBookingController= async (req,res,next)=>{
    const booking_id=req.params.booking_id
    const room_id=req.body.room_id;
    const user_id=req.body.user_id;
    const amount=req.body.amount;
    const status=req.body.status;
    const totalNoOfRooms=req.body.totalNoOfRooms;

    try {
    
    const addRoomsBackResponse=await updateRoomNumberHelper(room_id,totalNoOfRooms)
    const addMoneyToWalletResponse=await addToWalletHelper(user_id,amount)
    const response=await cancelBookingHelper(booking_id,status);


    res.status(200).json({response});
    } catch (error) {
        console.log(error)
        res.status(404).json({error})
    }
}


module.exports={
    getAllBookings,getAllBookingsOfUser,
    getABookingForUser,getABookingForOwner,
    changeBookingStatus,cancelBookingController
}