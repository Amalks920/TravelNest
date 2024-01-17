const bookingModel=require('../models/bookingModel')
const mongoose=require('mongoose')

const createBookingHelper=(data,totalPrice,checkInDate,checkOutDate,totalNoRooms)=>{
    const roomDetails=data[0]
    const userDetails=data[1]
    const hotelDetails=data[2]

   // console.log(roomDetails)
    console.log(hotelDetails)
    const dataToPassToDb={
        userId:userDetails._id,
        userName:userDetails.username,
        userEmail:userDetails.email,
        userPhone:userDetails.phone,
        hotel_id:hotelDetails._id,
        hotelName:hotelDetails.hotelName,
        roomDetails:roomDetails,
        totalAmount:totalPrice,
        checkIn:checkInDate,
        checkOut:checkOutDate,
        totalNoOfRooms:totalNoRooms
    }

    return new Promise(async (resolve,reject)=>{
        try {

        const response=await bookingModel.create(dataToPassToDb)
            resolve(response)

        } catch (error) {
            reject(error)
        }
    })
}


const changePaymentStatus=(status)=>{
    return new Promise( async (resolve,reject)=>{
        try {
          const response=await  bookingModel.updateOne(
            {}
            )
        } catch (error) {
            reject(error)
        }
    })
}

const getAllBookingsHelper=(hotel_id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const response=await bookingModel.find({hotel_id:hotel_id})

            resolve(response)
            
        } catch (error) {
            reject(error)
        }
    })
}


const getAllBookingsOfHelper=(user_id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            console.log(user_id)
        const response=await bookingModel.aggregate([
           {
            $match:{
                userId:new mongoose.Types.ObjectId(user_id)
            }
           },
           {
            $lookup:{
                from:'hotels',
                localField:'hotel_id',
                foreignField:'_id',
                as:'hotel_details'
            }
           },
           {
            $unwind:'$hotel_details'
           },
           {
            $project:{
                hotelName:1,
                checkIn:1,
                checkOut:1,
                hotelImages:'$hotel_details.images',
                totalAmount:1,
                status:1,
                totalNoOfRooms:1
            }
           }
        ])
        // find({userId:user_id})
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

const getABookingForUserHelper=(booking_id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
        const response=await bookingModel.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(booking_id)
                }
            },
            {
                $lookup:{
                    from:'hotels',
                    localField:'hotel_id',
                    foreignField:'_id',
                    as:'hotel_details'
                }
               },
               {
                $unwind:'$hotel_details'
               }
        ])
        console.log(response)
        resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

const getABookingForOwnerHelper=(booking_id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const response=await bookingModel.aggregate([
                {
                    $match:{
                        _id:new mongoose.Types.ObjectId(booking_id)
                    }
                }
            ])
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

const changeBookingStatusHelper=(booking_id,status)=>{
    return new Promise( async (resolve,reject)=>{
        try {
            const response=await bookingModel.updateOne(
                {_id:booking_id},
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

module.exports={
    createBookingHelper,changePaymentStatus,
    getAllBookingsHelper,getAllBookingsOfHelper,
    getABookingForUserHelper,getABookingForOwnerHelper,
    changeBookingStatusHelper
}