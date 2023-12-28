const roomModel = require("../models/roomModel");
const hotelModel=require('../models/hotelModel');
const { default: mongoose } = require("mongoose");

const addRoomHelper = (data) => {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await roomModel.create(data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};


const addRoomToHotel=(hotel_id,room_id)=>{
    console.log(hotel_id," +++++++----===>  ",room_id)
    return new Promise(async (resolve,reject)=>{
        try {
        const res=await hotelModel.updateOne(
            {_id:hotel_id},
            {$push:{room_id:room_id}}
            )
           resolve(res)   
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const getRoomsHelper=(hotel_id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const result=await roomModel.find({hotel_id:hotel_id});
            resolve(result)
        } catch (error) {
            reject(error)    
        }
    })
}

const editRoomHelper=(hotel_id,room_id,data,imgPathArr)=>{
    return new Promise(async(resolve,reject)=>{
      try {
        const result=await roomModel.updateOne(
          {_id:room_id},
          {
            $set:{
              data
            },
            $push:{
              images:{
                $each:imgPathArr
              }
            }
          }
        )
      } catch (error) {
        reject(error)
      }
    })
}

const groupRoomByType=(hotel_id)=>{
  console.log(hotel_id)
   return new Promise(async (resolve,reject)=>{
    try {

      const response= await roomModel.aggregate([
        {
          $match:{
            hotel_id: new mongoose.Types.ObjectId(hotel_id) 
          }
        },
        {
          $group: {
            _id: '$roomType',
            // rooms: { $push: { roomType: '$roomType'} }, // Include only the fields you need
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0, // Exclude the _id field if you don't need it
            roomType: '$_id',
            rooms: 1, // Include the 'rooms' field
            count: 1 // Include the 'count' field
          }
        }
        
       ])

       resolve(response)

    } catch (error) {
      console.log(error)
      reject(error)
    }
   })
}

const findRoomsInHotelHelper=(hotel_id)=>{
  console.log('entered room helper')
  return new Promise(async (resolve,reject)=>{
    try {
      console.log(hotel_id)
      const response=await roomModel.find({hotel_id:hotel_id})
      console.log(response)
      console.log('response room model')
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  addRoomHelper,addRoomToHotel,
  getRoomsHelper,editRoomHelper,
  groupRoomByType,findRoomsInHotelHelper

};
