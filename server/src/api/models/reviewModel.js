const mongoose = require('mongoose'); // Erase if already required
const ObjectId=require('mongodb').ObjectId

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateReviewInput:
 *      type: object
 *      properties:
 *        user_id:
 *          type: string
 *        heading:
 *          type: string
 *        description:
 *          type: string
 *        rating:
 *          type: number
 *        images:
 *          type: Array
 */

var userSchema = new mongoose.Schema({
   
 
    hotel_id:{
        type:ObjectId,
        ref:'Hotel',
        required:true
    },
    user_id:{
        type:ObjectId,
        ref:'Hotel',
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
},
{
    timestamps:true
}
);


const Booking= mongoose.model("Booking", bookingSchema);
export default Booking