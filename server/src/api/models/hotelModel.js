const mongoose = require('mongoose'); // Erase if already required
const ObjectId=require('mongodb').ObjectId

/**
 * @openapi
 * components:
 *  schemas:
 *    GetAllHotelsResponse:
 *      type: object
 *      properties:
 *        hotelname:
 *          type: string
 *        description:
 *          type: string
 *        images:
 *          type: object
 *        averageRating:
 *          type: object
 *        location:
 *          type: string
 *        reviews:
 *          type: object
 *        rooms:
 *          type: object
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */


// Define the Hotel schema
const hotelSchema = new mongoose.Schema({
  
    // Name of the hotel
    name: { type: String, required: true },
  
    // Description of the hotel
    description: { type: String, required: true },
  
    // Array of images associated with the hotel
    images: { type: [String], default: [] },
  
    // Reference to reviews associated with the hotel
    reviews: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
  
    // Average rating for the hotel
    averageRating: { type: Number, default: 0 },
  
    // Array of room references associated with the hotel
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  
    // Reference to a coupon associated with the hotel
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
  
    // Location information for the hotel
    location: { type: String, required: true },
  
    // Timestamp for when the hotel was created
    createdAt: { type: Date, default: Date.now },

    updatedAt: { type: Date, default: Date.now }
  });


//Export the model
module.exports = mongoose.model('hotel', hotelSchema);