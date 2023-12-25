const cloudinary = require("../../config/cloudinary");
const hotelModel = require("../models/hotelModel");

const uploadImages = (files) => {
  return new Promise(async (resolve, reject) => {
    let cloudImgArray = [];
    try {
      for (var i = 0; i < files.length; i++) {
        cloudImage = await cloudinary.uploader.upload(files[i].path, {
          timeout: 60000,
        });
        cloudImgArray.push(cloudImage);
      }
      console.log(cloudImgArray);
      resolve(cloudImgArray);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const saveHotelDocumentHelper = function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await hotelModel.create(data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const getHotelsHelper = function (id = null) {
  return new Promise(async (resolve, reject) => {
    try {
      const hotels = await hotelModel.find({});
      resolve(hotels);
    } catch (error) {
      reject(error);
    }
  });
};

const getAHotelHelper = function (hotel_id) {
  return new Promise((resolve, reject) => {
    try {
      const hotel = hotelModel.findOne({ _id: hotel_id });
      resolve(hotel);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const editHotelHelper = function (data, imagePathArray) {
  const { hotelName, location, description, hotel_id } = data;
  console.log(data);
  console.log(hotel_id);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await hotelModel.updateOne(
        { _id: hotel_id },
        {
          $set: {
            hotelName,
            location,
            description
          },
          $push:{
            images:{
                $each:imagePathArray
            }
          }
        }
      );

      // resolve(response)
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  uploadImages,
  getAHotelHelper,
  saveHotelDocumentHelper,
  getHotelsHelper,
  editHotelHelper,
};
