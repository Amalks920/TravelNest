const bookingModel = require("../models/bookingModel");

const getSalesReportHelper = async () => {
  try {
    const response = await bookingModel.aggregate([
        {
            $match:{
                status:'checkOut'
            }
        },
      {
        $group: {
            _id:{hotel_id:'$hotel_id'},
            totalRevenue:{$sum:'$totalAmount'},
            bookings: { $addToSet: '$$ROOT' }
        },
      },
      {
        $lookup:{
            from:'hotels',
            localField:'_id.hotel_id',
            foreignField:'_id',
            as:'hotelDetails'
        }
      }
    ]);
    return response
  } catch (error) {
    throw error;
  }
};

const getSalesReportByDateHelper = async (startDate,endDate) => {
    try {
    console.log(startDate,endDate)  
    const response=await bookingModel.aggregate([
        {
            $match:{
                $and:[
                    {checkOut:
                       {
                        $gte: new Date(startDate)
                    }
                    },
                     {
                        checkOut:{
                            $lte: new Date(endDate)
                        }
                     }   

                ]
            }
        },
        {
            $group: {
                _id:{hotel_id:'$hotel_id'},
                totalRevenue:{$sum:'$totalAmount'},
                bookings: { $addToSet: '$$ROOT' }
            },
          },
          {
            $lookup:{
                from:'hotels',
                localField:'_id.hotel_id',
                foreignField:'_id',
                as:'hotelDetails'
            }
          }
    ])
    console.log(response)
    return response
    } catch (error) {
        throw error
    }
}

module.exports = {
  getSalesReportHelper,getSalesReportByDateHelper
};
