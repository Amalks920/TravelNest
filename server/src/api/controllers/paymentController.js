const { createBookingHelper } = require("../helpers/bookingHelper");
const mongoose=require('mongoose')
const {
  getAHotelHelper,
  getAHotelHelperForOrder,
} = require("../helpers/hotelHelper");
const {
  getRoomDetailsByIdHelper,
  decreaseRoomsCount,
} = require("../helpers/roomHelper");
const { findUserByUserName } = require("../helpers/userHelper");
const { checkout } = require("../routes/paymentRoute");
const { updateWalletAmountHelper, updateWalletHistoryHelper, getWalletAmountHelper } = require("../helpers/walletHelper");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const payment = async (req, res, next) => {
  try {
    console.log(req.body);
    const { roomDetails, checkInDate, checkOutDate, hotel_id, totalNoRooms } =
      req.body;
    const roomIds = [];

    roomDetails.forEach((room, index) => {
      roomIds.push(room.id);
    });

    const roomDetailsFromDb = await getRoomDetailsByIdHelper(roomIds);
    let totalPrice = 0;

    roomDetails.forEach((room) => {
      const matchingRoomType = roomDetailsFromDb.find(
        (dbRoom) => dbRoom.roomType == room.roomType
      );

      if (matchingRoomType) {
        const rate = matchingRoomType.rate;
        const noOfRooms = parseInt(room.noOfRooms);
        totalPrice += rate * noOfRooms;
      }
    });

    const findUser = await findUserByUserName(req.user);
    const findHotel = await getAHotelHelperForOrder(hotel_id);

    const result = await Promise.all([roomDetailsFromDb, findUser, findHotel]);

    const booking_details = {
      result,
      totalPrice,
      checkInDate,
      checkOutDate,
      totalNoRooms,
    };
    // const response = await createBookingHelper(
    //   result,
    //   totalPrice,
    //   checkInDate,
    //   checkOutDate,
    //   totalNoRooms
    // );
    // console.log(response);

    const lineItems = roomDetails.map((product) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: product.id,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.noOfRooms,
    }));

    console.log(lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/login",
      metadata: {
        booking_details: JSON.stringify({
          result,
          totalPrice,
          checkInDate,
          checkOutDate,
          totalNoRooms,
        }),
        roomDetails: JSON.stringify({
          roomDetails,
        }),
      },
    });
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};

const payUsingWallet = async (req, res, next) => {
  try {
   
    let { roomDetails, checkInDate, checkOutDate, hotel_id, totalNoRooms } =
      req.body;
    const roomIds = [];

    roomDetails.forEach((room, index) => {
      roomIds.push(room.id);
    });

    const roomDetailsFromDb = await getRoomDetailsByIdHelper(roomIds);
    let totalPrice = 0;
    let noOfRooms=0

    roomDetails.forEach((room) => {
      const matchingRoomType = roomDetailsFromDb.find(
        (dbRoom) => dbRoom.roomType == room.roomType
      );

      if (matchingRoomType) {
        const rate = matchingRoomType.rate;
         noOfRooms = parseInt(room.noOfRooms);
        
        totalPrice += rate * noOfRooms;
      }
    });

    const findUser = await findUserByUserName(req.user);
    const findHotel = await getAHotelHelperForOrder(hotel_id);

    const result = await Promise.all([roomDetailsFromDb, findUser, findHotel]);

    const room={roomDetails}
      roomDetails=room;
    const decreaseRoomCountResponse = await decreaseRoomsCount(roomDetails);
    console.log(result[0])
    console.log('result[0]')
    let roomRes=result[0]

    console.log(roomDetails)
    console.log('rooom deeetails')

    for(var i=0;i<roomRes.length;i++){
 
      for(var j=0;j<roomDetails.roomDetails.length;j++){
        console.log(roomRes[i]._id, new mongoose.Types.ObjectId(roomDetails.roomDetails[j].id))
        if(roomRes[i]._id.equals(roomDetails.roomDetails[j].id)){
          
          roomRes[i].noOfRooms=roomDetails.roomDetails[j].noOfRooms
        }
      }
    }

    result[0]=roomRes
 
    
    const response = await createBookingHelper(
      result,
      totalPrice,
      checkInDate,
      checkOutDate,
      totalNoRooms,
      roomDetails
    );

    await updateWalletAmountHelper({ user_id:findUser._id, amount:-totalPrice,type:'withdrawal' })

    res.status(200).json({});
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }
};

const webHookController = async (req, res, next) => {
  try {
    const { type, data } = req.body;
    console.log('{type,.datraladsjldsfjlkskjldsfkjldkjfkj}')
    if (type === "checkout.session.completed") {
      const bookingDetailsString = data.object.metadata.booking_details;
      const roomDetailsString = data.object.metadata.roomDetails;
      const roomDetails = JSON.parse(roomDetailsString);

      const decreaseRoomCountResponse = await decreaseRoomsCount(roomDetails);

      const bookingDetails = JSON.parse(bookingDetailsString);

      const { result, totalPrice, checkInDate, checkOutDate, totalNoRooms } =
        bookingDetails;

        let roomRes=result[0]

        for(var i=0;i<roomRes.length;i++){
 
          for(var j=0;j<roomDetails.roomDetails.length;j++){
            console.log(roomRes[i]._id, new mongoose.Types.ObjectId(roomDetails.roomDetails[j].id))
            if( new mongoose.Types.ObjectId(roomRes[i]._id).equals(roomDetails.roomDetails[j].id)){
              
              roomRes[i].noOfRooms=Number(roomDetails.roomDetails[j].noOfRooms)
            }
          }
        }
    
        result[0]=roomRes
        console.log(result)
       


      const response = await createBookingHelper(
        result,
        totalPrice,
        checkInDate,
        checkOutDate,
        totalNoRooms
      );
      console.log(response);

      res.status(200).json({ response });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};

const updateWalletAmount= async (req,res) => {
  try {
    const response=await updateWalletAmountHelper(req.body)
    // console.log(response)
    // const {_id,user_id,amount}=response;
    // const walletHistoryResponse=await updateWalletHistoryHelper(_id,amount,'withdrawal')
    console.log(response)
    res.status(200).json({response})
  } catch (error) {
    res.status(200).json({error})
  }
}

const getWalletAmount=async (req,res) =>{
  const user_id=req.params.user_id
    try {
      const response=await getWalletAmountHelper(user_id)

      res.status(200).json({response})
    } catch (error) {
      res.status(500).json({error})
    }
}

module.exports = {
  payment,
  webHookController,
  payUsingWallet,
  updateWalletAmount,
  getWalletAmount
};
