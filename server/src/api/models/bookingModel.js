
const userModel=require("./userModel.js");
const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *  schemas:
 *    GetAllBookingResponse:
 *      type: object
 *      properties:
 *        userEmail:
 *          type: string
 *        userid:
 *          type: string
 *        userName:
 *          type: string
 *        hotelName:
 *          type: string
 *        hotelLocation:
 *        couponid:
 *          type: string
 *        rooms:
 *          type: Array
 *        checkin:
 *          type: date
 *        checkout:
 *          type: date
 *        totalDays:
 *          type: number
 *        totalAmount:
 *          type: number
 *        discountAmount:
 *          type: number
 *        status:
 *          type: string
 *        paymentType:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */


const bookingSchema = new Schema(
    {
      userEmail: {
        type: String,
        required: true,
      },
      userid: {
        type: ObjectId,
        required: true,
        ref: 'User', // Provide the name of the referenced model as a string
      },
      userName: {
        type: String,
        required: true,
      },
      hotelName: {
        type: String,
        required: true,
      },
      hotel_id: {
        type: ObjectId,
        required: true,
      },
      hotelLocation: {
        type: String,
        required: true,
      },
      checkIn: {
        type: String,
      },
      checkOut: {
        type: String,
      },
      totalDays: {
        type: Number,
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
      discountAmount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
        default: "paymentDone",
      },
      guestDetails:{
        type:Array,
        default:[]
      },
      payementType: {
        type: String,
        required: true,
        default: "null",
      } // Remove the extra comma here
    },
    {
      timestamps: true,
    }
  );
  

const Booking= mongoose.model("Booking", bookingSchema);
export default Booking


