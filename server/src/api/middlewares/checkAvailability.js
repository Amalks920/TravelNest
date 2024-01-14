const bookingModel = require("../models/bookingModel");



const checkAvailability=async (req,res,next)=>{
    // const {checkIn,checkOut}=req.query
    // console.log(checkIn,checkOut)
    // console.log(req.query)
    console.log(req.body)
    console.log('req.body')
    console.log(req.query)
    const checkInDate=req.query.checkIn || null;
    const checkOutDate=req.query.checkout || null;
    const newCheckIn = new Date(checkInDate);
    const newCheckOut = new Date(checkOutDate);
    console.log(newCheckIn,newCheckOut)
try {
  
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



 let existingCollisionIdArray = [];

    existingCollisions.forEach((booking, index) => {
      existingCollisionIdArray.push(booking?.roomDetails[0]?._id);
    });

    const filteredExistingCollisionIdArray=[]
   
    filteredExistingCollisionIdArray.push(existingCollisionIdArray[0]);

    for (var i = 0; i < existingCollisionIdArray.length; i++) {

      let isExist=filteredExistingCollisionIdArray.find(
        (element) => element.equals(existingCollisionIdArray[i])
      )
      console.log(isExist)
      console.log('isExist')
      if (!isExist) {
        filteredExistingCollisionIdArray.push(existingCollisionIdArray[i]);
      }else{
        console.log('inside else condition')
      }
    }

    console.log(filteredExistingCollisionIdArray)

   res.locals.existingCollisions=filteredExistingCollisionIdArray
  next();

} catch (error) {
console.log(error)
}


 
}


module.exports=checkAvailability;