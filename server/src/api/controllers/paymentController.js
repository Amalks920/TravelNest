const { createBookingHelper } = require("../helpers/bookingHelper");
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
    console.log(req.body);
    let { roomDetails, checkInDate, checkOutDate, hotel_id, totalNoRooms } =
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

    // const booking_details = {
    //   result,
    //   totalPrice,
    //   checkInDate,
    //   checkOutDate,
    //   totalNoRooms,
    // };

    const room={roomDetails}
      roomDetails=room;
    const decreaseRoomCountResponse = await decreaseRoomsCount(roomDetails);

    const response = await createBookingHelper(
      result,
      totalPrice,
      checkInDate,
      checkOutDate,
      totalNoRooms
    );

    res.status(200).json({});
  } catch (error) {
    console.log(error)
    res.status(404).json({ error });
  }
};

const webHookController = async (req, res, next) => {
  try {
    const { type, data } = req.body;

    if (type === "checkout.session.completed") {
      const bookingDetailsString = data.object.metadata.booking_details;
      const roomDetailsString = data.object.metadata.roomDetails;
      const roomDetails = JSON.parse(roomDetailsString);

      const decreaseRoomCountResponse = await decreaseRoomsCount(roomDetails);

      const bookingDetails = JSON.parse(bookingDetailsString);

      const { result, totalPrice, checkInDate, checkOutDate, totalNoRooms } =
        bookingDetails;
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

module.exports = {
  payment,
  webHookController,
  payUsingWallet,
};
