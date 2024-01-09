const { createBookingHelper } = require("../helpers/bookingHelper");
const {
  getAHotelHelper,
  getAHotelHelperForOrder,
} = require("../helpers/hotelHelper");
const { getRoomDetailsByIdHelper } = require("../helpers/roomHelper");
const { findUserByUserName } = require("../helpers/userHelper");
const { checkout } = require("../routes/paymentRoute");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const payment = async (req, res, next) => {
  try {
    console.log(req.body);
    const { roomDetails, totalPrice, checkInDate, checkOutDate, hotel_id,totalNoRooms } =
      req.body;
    const roomIds = [];

    roomDetails.forEach((room, index) => {
      roomIds.push(room.id);
    });



    const roomDetailsFromDb = await getRoomDetailsByIdHelper(roomIds);
    const findUser = await findUserByUserName(req.user);
    const findHotel = await getAHotelHelperForOrder(hotel_id);

    const result = await Promise.all([roomDetailsFromDb, findUser, findHotel]);

    const response = await createBookingHelper(
      result,
      totalPrice,
      checkInDate,
      checkOutDate,
      totalNoRooms
    );
    console.log(response);
    return;
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
      success_url: "http://localhost:5173",
      cancel_url: "http://localhost:5173/login",
    });
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};

module.exports = {
  payment,
};
