const bookingModel=require('../models/bookingModel')


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




module.exports={
    createBookingHelper,changePaymentStatus
}