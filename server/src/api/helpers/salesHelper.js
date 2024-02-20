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

const getSalesPerTwoWeekHelper= async (hotelIdArray) =>{
  try {
    const response=await bookingModel.aggregate([
        {
          $match:{
            hotel_id:{$in:hotelIdArray},
            status:'checkOut'
          }
        },
        {
          $addFields: {
          //  month: { $dateToString: { format: "%B", date: "$createdAt" } }, // Convert month number to month name
              month: { $month: "$createdAt" }, // Extract month
              dayOfMonth: { $dayOfMonth: "$createdAt" } // Extract day of the month
          }
      },
        {
          $group: {
            _id: { month: "$month", weekInMonth: { $ceil: { $divide: ["$dayOfMonth", 7] } } },
              avgTotalRevenue: { $avg: "$totalAmount" },
              totalBookings: { $sum: 1 }
          }
      },
      {
        $project: {
            _id: 0,
           month: "$_id.month",
           weekInMonth: "$_id.weekInMonth",
            avgTotalRevenue: 1,
            totalBookings: 1
        }
    }
    ]);

    return response
  } catch (error) {
    throw error
  }
}

const getSalesPerMonthHelper= async (hotelIdArray) =>{
  try {
    const response=await bookingModel.aggregate([
      {
        $match: {
            hotel_id: { $in: hotelIdArray },
            status: 'checkOut'
        }
    },
    {
        $addFields: {
            month: { $month: "$createdAt" } // Extract month
        }
    },
    {
        $group: {
            _id: "$month", // Group by month
            avgTotalRevenue: { $avg: "$totalAmount" },
            totalBookings: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            month: "$_id",
            avgTotalRevenue: 1,
            totalBookings: 1
        }
    },
    {
        $sort: { month: 1 } // Optional: Sort by month in ascending order
    }
    ]);

    return response
  
  
  
 
 
 
 
  } catch (error) {
    throw error
  }
}

const getSalesPerDayHelper= async (hotelIdArray) =>{
  try {
  
    const currentDate = new Date();
const sevenDaysAgo = new Date(currentDate);
sevenDaysAgo.setDate(currentDate.getDate() - 7); 
    // const response = await bookingModel.aggregate([
    //     {
    //         $match: {
    //             hotel_id: { $in: hotelIdArray },
    //             status: 'checkOut',
    //             createdAt: { $gte: sevenDaysAgo } // Filter bookings within the last 7 days
    //         }
    //     },
    //     {
    //         $addFields: {
    //             dayOfWeek: { $dayOfWeek: "$createdAt" }, // Extract day of the week (1 for Sunday, 2 for Monday, ..., 7 for Saturday)
    //             dayOfMonth: { $dayOfMonth: "$createdAt" } // Extract day of the month
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: { dayOfWeek: "$dayOfWeek", dayOfMonth: "$dayOfMonth" },
    //             totalAmount: { $sum: "$totalAmount" }, // Sum of totalAmount for each group
    //             totalBookings: { $sum: 1 }
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 0,
    //             dayOfWeek: "$_id.dayOfWeek",
    //             dayOfMonth: "$_id.dayOfMonth",
    //             totalAmount: 1,
    //             totalBookings: 1
    //         }
    //     }
    // ]);
    const dateSequence = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(sevenDaysAgo);
      date.setDate(sevenDaysAgo.getDate() + index);
      return date;
  });
  
  const response = await bookingModel.aggregate([
      {
          $match: {
              hotel_id: { $in: hotelIdArray },
              status: 'checkOut',
              createdAt: { $gte: sevenDaysAgo } // Filter bookings within the last 7 days
          }
      },
      {
          $addFields: {
              dayOfMonth: { $dayOfMonth: "$createdAt" } // Extract day of the month
          }
      },
      {
          $group: {
              _id: { dayOfMonth: "$dayOfMonth" },
              totalAmount: { $sum: "$totalAmount" }, // Sum of totalAmount for each group
              totalBookings: { $sum: 1 }
          }
      },
      {
          $project: {
              _id: 0,
              dayOfMonth: "$_id.dayOfMonth",
              totalAmount: 1,
              totalBookings: 1
          }
      }
  ]);
  
  // Create an object to hold the results for each day
  const resultsByDay = {};
  response.forEach(dayData => {
      resultsByDay[dayData.dayOfMonth] = {
          totalAmount: dayData.totalAmount,
          totalBookings: dayData.totalBookings
      };
  });
  
  // Fill in missing data for days with no bookings
  dateSequence.forEach(date => {
      const dayOfMonth = date.getDate();
      if (!resultsByDay.hasOwnProperty(dayOfMonth)) {
          resultsByDay[dayOfMonth] = {
              totalAmount: 0,
              totalBookings: 0
          };
      }
  });
  
  // Convert the results to an array sorted by day of the month
  const chartData = dateSequence.map(date => {
      const dayOfMonth = date.getDate();
      return {
          dayOfMonth: dayOfMonth,
          totalAmount: resultsByDay[dayOfMonth].totalAmount,
          totalBookings: resultsByDay[dayOfMonth].totalBookings
      };
  });
    
    console.log(chartData);
  
  
  return chartData
  } catch (error) {
    throw error
  }
}

const getYearlyReportHelper = async (hotelIdArray) => {
  try {
    // const currentYear = new Date().getFullYear();

    // // Generate an array of month numbers (1 to 12) for the current year
    // const monthsInYear = Array.from({ length: 12 }, (_, index) => index + 1);
    
    // const response = await bookingModel.aggregate([
    //     {
    //         $match: {
    //             hotel_id: { $in: hotelIdArray },
    //             status: 'checkOut',
    //             createdAt: { $gte: new Date(`${currentYear}-01-01`), $lt: new Date(`${currentYear + 1}-01-01`) } // Filter bookings for the current year
    //         }
    //     },
    //     {
    //         $addFields: {
    //             month: { $month: "$createdAt" } // Extract month
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: { month: "$month" },
    //             totalAmount: { $sum: "$totalAmount" }, // Sum of totalAmount for each month
    //             totalBookings: { $sum: 1 }
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 0,
    //             month: "$_id.month",
    //             totalAmount: 1,
    //             totalBookings: 1
    //         }
    //     }
    // ]);
    
    // // Create a map to store the sales data for each month
    // const salesDataMap = new Map();
    // response.forEach(monthData => {
    //     salesDataMap.set(monthData.month, monthData);
    // });
    
    // // Create an array to hold the chart data for all months
    // const chartData = monthsInYear.map(month => {
    //     const salesData = salesDataMap.get(month) || { month, totalAmount: 0, totalBookings: 0 };
    //     return {
    //         month: salesData.month,
    //         totalAmount: salesData.totalAmount,
    //         totalBookings: salesData.totalBookings
    //     };
    // });
    
    // console.log(chartData);
    // const currentYear = new Date().getFullYear();

    // const response = await bookingModel.aggregate([
    //     {
    //         $match: {
    //             hotel_id: { $in: hotelIdArray },
    //             status: 'checkOut',
    //             createdAt: { $gte: new Date(`${currentYear}-01-01`), $lt: new Date(`${currentYear + 1}-01-01`) } // Filter bookings for the current year
    //         }
    //     },
    //     {
    //         $addFields: {
    //             month: { $month: "$createdAt" } // Extract month
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: { month: "$month" },
    //             totalAmount: { $sum: "$totalAmount" }, // Sum of totalAmount for each month
    //             totalBookings: { $sum: 1 }
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 0,
    //             month: "$_id.month",
    //             totalAmount: 1,
    //             totalBookings: 1
    //         }
    //     }
    // ]);
    
    // // Create an array to hold the chart data for the current year
    // const chartData = response.map(monthData => ({
    //     month: monthData.month,
    //     totalAmount: monthData.totalAmount,
    //     totalBookings: monthData.totalBookings
    // }));
    
    // console.log(chartData);
    const currentYear = new Date().getFullYear();

const response = await bookingModel.aggregate([
    {
        $match: {
            hotel_id: { $in: hotelIdArray },
            status: 'checkOut',
            createdAt: { $gte: new Date(`${currentYear}-01-01`), $lt: new Date(`${currentYear + 1}-01-01`) } // Filter bookings for the current year
        }
    },
    {
        $addFields: {
            dayOfMonth: { $dayOfMonth: "$createdAt" } // Extract day of the month
        }
    },
    {
        $group: {
            _id: { dayOfMonth: "$dayOfMonth" },
            totalAmount: { $sum: "$totalAmount" }, // Sum of totalAmount for each day
            totalBookings: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            dayOfMonth: "$_id.dayOfMonth",
            totalAmount: 1,
            totalBookings: 1
        }
    },
    {
      $sort: { dayOfMonth: 1 } // Sort in ascending order by dayOfMonth
  }
]);

// Create an array to hold the chart data for the current year
const chartData = response.map(dayData => ({
    dayOfMonth: dayData.dayOfMonth,
    totalAmount: dayData.totalAmount,
    totalBookings: dayData.totalBookings
}));

console.log(chartData);

    

// console.log(chartData);


return chartData
  } catch (error) {
    throw error
  }
}

module.exports = {
  getSalesReportHelper,
  getSalesReportByDateHelper,
  getSalesReportForOwnerHelper,
  getSalesReportForOwnerHotelsHelper,
  getSalesPerTwoWeekHelper,
  getSalesPerMonthHelper,
  getSalesPerDayHelper,
  getYearlyReportHelper
};
