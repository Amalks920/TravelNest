const bookingModel = require("../models/bookingModel");
const roomModel = require("../models/roomModel");
const mongoose=require('mongoose')

const checkAvailability = async (req, res, next) => {

  const checkInDate = req.query.checkIn || null;
  const checkOutDate = req.query.checkOut || null;
  const newCheckIn = new Date(checkInDate);
  const newCheckOut = new Date(checkOutDate);

  try {
    // const existingCollisions = await bookingModel.find({
    //   $or: [
    //     {
    //       $and: [
    //         { checkIn: { $lt: newCheckIn } },
    //         { checkOut: { $gt: newCheckIn } },
    //       ],
    //     },
    //     {
    //       $and: [
    //         { checkIn: { $lt: newCheckOut } },
    //         { checkOut: { $gt: newCheckOut } },
    //       ],
    //     },
    //     {
    //       $and: [
    //         { checkIn: { $gte: newCheckIn } },
    //         { checkOut: { $lte: newCheckOut } },
    //       ],
    //     },
    //   ],
    // });

    const existingCollisions = await bookingModel.aggregate([
      {
        $match: {
          $or: [
            {
              $and: [
                { checkIn: { $lt: newCheckIn } },
                { checkOut: { $gt: newCheckIn } },
              ],
            },
            {
              $and: [
                { checkIn: { $lt: newCheckOut } },
                { checkOut: { $gt: newCheckOut } },
              ],
            },
            {
              $and: [
                { checkIn: { $gte: newCheckIn } },
                { checkOut: { $lte: newCheckOut } },
              ],
            },
          ],
        },
      },
    ]);

   


    let existingCollisionIdArray = [];

    existingCollisions.forEach((booking, index) => {
      console.log(booking?.roomDetails)
      existingCollisionIdArray.push(new mongoose.Types.ObjectId(booking?.roomDetails[0]?._id));
    });

    console.log(existingCollisions)
    console.log('existing colllisions')

    const filteredExistingCollisionIdArray = [];
    filteredExistingCollisionIdArray.push(existingCollisionIdArray[0]);

    for (var i = 0; i < existingCollisionIdArray.length; i++) {
      let isExist = filteredExistingCollisionIdArray.find(
        (element) => element.equals(existingCollisionIdArray[i])
      );

      if (!isExist) {
        filteredExistingCollisionIdArray.push(existingCollisionIdArray[i]);
      } else {
      }
    }
    console.log(filteredExistingCollisionIdArray)
    const response=await roomModel.find({_id:filteredExistingCollisionIdArray}).select('_id noOfRooms')

   

    for(var i=0;i<response.length;i++){
      if(findIfRoomNotAvailabe(response[i])===true){
        response.splice(i,1)
      }
    }

    function findIfRoomNotAvailabe(roomObj){
      let noOfDocumentsFound=0
      for(var i=0;i<existingCollisionIdArray.length;i++){
          if(roomObj.equals(existingCollisionIdArray[i])){
            noOfDocumentsFound++
          }
      }

      if(noOfDocumentsFound>=roomObj.noOfRooms){
         return true
      }else{
        return false
      }

    }

    
    res.locals.existingCollisions = filteredExistingCollisionIdArray;
    next();
  } catch (error) {
    console.log(error)
  }
};

module.exports = checkAvailability;
