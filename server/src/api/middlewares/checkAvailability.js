const bookingModel = require("../models/bookingModel");



const checkAvailability=async (req,res,next)=>{
    const {checkInDate,checkOutDate}=req.body
    const newCheckIn = new Date(checkInDate);
const newCheckOut = new Date(checkOutDate);

const existingCollisions = await bookingModel.find({
    $or: [
      {
        $and: [
          { checkIn: { $lt: newCheckIn } },
          { checkOut: { $gt: newCheckIn } }
        ]
      },
      {
        $and: [
          { checkIn: { $lt: newCheckOut } },
          { checkOut: { $gt: newCheckOut } }
        ]
      },
      {
        $and: [
          { checkIn: { $gte: newCheckIn } },
          { checkOut: { $lte: newCheckOut } }
        ]
      }
    ]
  });

  console.log(existingCollisions);
}


module.exports=checkAvailability;