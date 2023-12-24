const roomModel = require("../models/roomModel");
const hotelModel=require('../models/hotelModel')

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

module.exports = {
  addRoomHelper,addRoomToHotel,
  getRoomsHelper

};
