const bookingModel = require("../models/bookingModel");
const mongoose = require("mongoose");
const hotelModel = require("../models/hotelModel");

const getSalesReportHelper = async () => {
  try {
    const response = await bookingModel.aggregate([
      {
        $match: {
          status: "checkOut",
        },
      },
      {
        $group: {
          _id: { hotel_id: "$hotel_id" },
          totalRevenue: { $sum: "$totalAmount" },
          bookings: { $addToSet: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "hotels",
          localField: "_id.hotel_id",
          foreignField: "_id",
          as: "hotelDetails",
        },
      },
    ]);
    return response;
  } catch (error) {
    throw error;
  }
};

const getSalesReportByDateHelper = async (startDate, endDate) => {
  try {
    console.log(startDate, endDate);
    const response = await bookingModel.aggregate([
      {
        $match: {
          $and: [
            {
              checkOut: {
                $gte: new Date(startDate),
              },
            },
            {
              checkOut: {
                $lte: new Date(endDate),
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: { hotel_id: "$hotel_id" },
          totalRevenue: { $sum: "$totalAmount" },
          bookings: { $addToSet: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "hotels",
          localField: "_id.hotel_id",
          foreignField: "_id",
          as: "hotelDetails",
        },
      },
    ]);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

const getSalesReportForOwnerHelper = async (hotel_id) => {
  try {

    const response= await bookingModel.find({hotel_id:hotel_id,status:'checkOut'})
    return response;
  } catch (error) {
    throw error;
  }
};

const getSalesReportForOwnerHotelsHelper = async (user_id) => {
  try {
    let hotelIdArray = [];

    const response = await hotelModel.find({
      owner_id: user_id,
      status: "listed",
    });

    response.map((hotel, index) => {
      hotelIdArray.push(hotel._id);
    });

    const bookingResponse = await bookingModel.aggregate([
      {
        $match: {
          status: "checkOut", 
          hotel_id:{$in:hotelIdArray}
        },
      },
      {
        $group: {
          _id: { hotel_id: "$hotel_id" },
          totalRevenue: { $sum: "$totalAmount" },
          bookings: { $addToSet: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "hotels",
          localField: "_id.hotel_id",
          foreignField: "_id",
          as: "hotelDetails",
        },
      },
      {
        $project:{
          totalRevenue:1,
          bookings:1,
          _id:0,
          hotelDetails:1,
        }
      },
      {
        $unwind:'$hotelDetails'
      },
      {
        $project:{
          totalRevenue:1,
          bookings:1,
          _id:0,
          hotelName:'$hotelDetails.hotelName',
          hotel_id:'$hotelDetails._id'
        }
      }
    ]);

    return bookingResponse;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSalesReportHelper,
  getSalesReportByDateHelper,
  getSalesReportForOwnerHelper,
  getSalesReportForOwnerHotelsHelper,
};
