const roomModel = require("../models/roomModel");
const hotelModel=require('../models/hotelModel');
const { default: mongoose } = require("mongoose");
const { resolve } = require("path");

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
            rooms: { $push:
               { 
                id: '$_id',
                description:'$description',
                size:'$size',
                amenities:'$amenities',
                noOfRooms:'$noOfRooms',
                bathRoomType:'$bathroomType',
                images:'$images',
                rate:'$rate',
                createdAt:'$createdAt'
              },
               }, // Include only the fields you need
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 1, // Exclude the _id field if you don't need it
            roomType: '$_id',
            description:'$rooms.description',
            size:'$rooms.size',
            amenities:'$rooms.amenities',
            noOfRooms:'$rooms.noOfRooms',
            bathRoomType:'$rooms.bathRoomType',
            images:'$rooms.images',
            rate:'$rooms.rate',
            createdAt:'$rooms.createdAt',
            rooms: 1, // Include the 'rooms' field
            count: 1 // Include the 'count' field
          }
        }
        
       ])
       console.log(response)
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

const changeAllRoomStatus=(hotel_id,status)=>{
  return new Promise(async (resolve,reject)=>{
    try {
      const response=await roomModel.updateMany(
        {hotel_id:hotel_id},
        {
          $set:{
            status:status
          }
        }
        )
        resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

const getAllRoomsOfAHotelForUserHelper=(hotel_id)=>{
  return new Promise(async (resolve,reject)=>{
    try {
      // const response=await roomModel.find(
      //   {
      //     hotel_id:hotel_id
      //   }
      //   {
      //     $and:[
      //       {
      //         hotel_id:hotel_id
      //       },
      //       {
      //         status:'listed'
      //       }
      //     ]
      //   }
      // )
      
      const response= await roomModel.aggregate([
        {
          $match:{
           // hotel_id: new mongoose.Types.ObjectId(hotel_id),
            $and:[
              {
                hotel_id: new mongoose.Types.ObjectId(hotel_id),
              }
            ]
          }
        },
        {
          $group: {
            _id: '$roomType',
            rooms: { $push:
               { 
                id: '$_id',
                description:'$description',
                size:'$size',
                hotel_id:'$hotel_id',
                amenities:'$amenities',
                noOfRooms:'$noOfRooms',
                bathRoomType:'$bathroomType',
                images:'$images',
                rate:'$rate',
                createdAt:'$createdAt'
              },
               }, // Include only the fields you need
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 1, // Exclude the _id field if you don't need it
            roomType: '$_id',
            // description:'$rooms.description',
            // size:'$rooms.size',
            // amenities:'$rooms.amenities',
            // noOfRooms:'$rooms.noOfRooms',
            // bathRoomType:'$rooms.bathRoomType',
            // images:'$rooms.images',
            // rate:'$rooms.rate',
            // createdAt:'$rooms.createdAt',
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

const editRoomDescriptionHelper=(room_id,description)=>{
  return new Promise(async (resolve,reject)=>{
    try {
      const response=await roomModel.updateOne(
        {_id:room_id},
        {
          $set:{
            'description':description
          }
        }
        )

        resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}


const getRoomDetailsByIdHelper=(roomIds)=>{
// roomId
// priceRoom
// roomType
// noOfPeopleAllowed
  return new Promise(async (resolve,reject)=>{
    try {
      const roomDetails=await roomModel.find({
        '_id':roomIds
      },
      {
        _id:1,
        rate:1,
        roomType:1,
        noOfPeopleAllowed:1
      }
      )

      resolve(roomDetails)
    } catch (error) {
      reject(error)
    }
  })


}

const addRoomImagesHelper=(room_id,imagePathArray)=>{
    console.log(room_id)
    console.log(imagePathArray)
    return new Promise(async (resolve,reject)=>{
      
      try {
        const response=await roomModel.updateOne(
          {
            _id:room_id
          },
          {
              $push:{
                images: {
                  $each: imagePathArray,
                }     
              }
          }
        )
        console.log(response)
        resolve(response)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
}

module.exports = {
  addRoomHelper,addRoomToHotel,
  getRoomsHelper,editRoomHelper,
  groupRoomByType,findRoomsInHotelHelper,
  changeAllRoomStatus,getAllRoomsOfAHotelForUserHelper,
  editRoomDescriptionHelper,getRoomDetailsByIdHelper,
  addRoomImagesHelper
};
