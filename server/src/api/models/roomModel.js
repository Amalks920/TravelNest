const mongoose = require('mongoose'); // Erase if already required
const ObjectId = require('mongodb').ObjectId

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateRoomInput:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *        - roomType
 *        - description
 *        - bedding
 *        - features
 *        - size
 *        - amenities
 *        - bathroomType
 *        - rate
 *      properties:
 *        roomType:
 *          type: string
 *          default: single
 *          # Description of the room
 *        description:
 *          type: string
 *          default: "aljsdf alsdjfl dslkdflk dsl sldkfjlk"
 *          # Type of bedding in the room
 *        bedding:
 *          type: string
 *          default: single
 *          # Features associated with the room (as a string)
 *        features:
 *          type: string
 *          default: tv
 *          # Size of the room in square units
 *        size:
 *          type: number
 *          default: 0  # Replace with the appropriate default size
 *          # Amenities available in the room (as an array of strings)
 *        amenities:
 *          type: array
 *        items:
 *          type: string
 *          default: ["skd", "lsdf", "skldfj", "nv", "sldj"]
 *          # Type of bathroom in the room (e.g., En-suite, Bathtub, Shower)
 *        bathroomType:
 *          type: string
 *          default: lsdjlsd
 *          # Rate or cost of the room
 *        rate:
 *          type: number
 *          default: 34544
 *    CreateRoomResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 */

const roomSchema = new mongoose.Schema({
    // Unique identifier for the room
    id: { type: mongoose.Schema.Types.ObjectId, required: true },

    // Type of the room (e.g., single, double, suite, etc.)
    roomType: {
        type: String,
        enum: ['single', 'double', 'suite', 'family', 'adjoining', 'presidential', 'penthouse'],
        required: true,
    },

    // Description of the room
    description: { type: String, required: true },

    // Type of bedding in the room
    bedding: { type: String, required: true },

    // Features associated with the room (as an array of strings)
    features: { type: [String], default: [] },

    // Size of the room in square units
    size: { type: Number, required: true },

    // Amenities available in the room (as an array of strings)
    amenities: { type: [String], default: [] },

    // Type of bathroom in the room (e.g., En-suite, Bathtub, Shower)
    bathroomType: {
        type: String,
        enum: ['En-suite', 'Bathtub', 'Shower'],
        required: true,
    },

    // Rate or cost of the room
    rate: { type: Number, required: true },

    // Timestamp for when the room was created
    timestamps: { type: Date, default: Date.now },
});


// Define the Room model
const Room = mongoose.model('Room', roomSchema);

// Export the Room model
module.exports = Room;