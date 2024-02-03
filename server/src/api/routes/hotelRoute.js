const express = require('express');
const { createHotel, getAllHotels, getAHotel, editHotel, getAllHotelDetails,getAHotelForUser,deleteHotelImage, changeHotelStatus, getAllHotelsForUser, getAllHotelsForAdmin, editHotelDetail, editHotelName, editHotelLocation, editHotelDescription, addHotelImages, getRatingOfAHotel, getAllHotelsLength } = require('../controllers/hotelController');
const router = express.Router();
const uploader=require('../../config/multer');
const verifyJwt = require('../utils/verifyJwt');
const checkAvailability = require('../middlewares/checkAvailability');

/**
 * @openapi
 * paths:
 *   '/api/hotel/get-all-hotels':
 *     get:
 *       tags:
 *         - Hotel
 *       summary: Edit user details by ID
 *       responses:
 *         200:
 *           description: User details edited successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetAllHotelsResponse'
 *         402:
 *           description: Failed to edit user details
 *         400:
 *           description: Bad request
 */

router.get('/get-all-hotels/:userId',verifyJwt,getAllHotels)

router.get('/get-all-hotels-length/:user_id',getAllHotelsLength)

router.get('/get-all-hotels-admin',verifyJwt,getAllHotelsForAdmin)
/**
 * @openapi
 * paths:
 *   '/api/hotel/get-hotels-group-by-location':
 *     get:
 *       tags:
 *         - Hotel
 *       summary: get hotel details grouped by location
 *       responses:
 *         200:
 *           description: hotel details fetched  successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetAllHotelsResponse'
 *         402:
 *           description: Failed to fetch hotel details
 *         400:
 *           description: Bad request
 */

router.get('/get-hotels-group-by-location',(req,res)=>{
    res.status(200).json({message:[{},{},{}]})
})
/**
 * @openapi
 * paths:
 *   '/api/user/get-a-hotel/{hotel-id}':
 *     get:
 *       tags:
 *         - Hotel
 *       summary: Get a user by ID
 *       parameters:
 *         - in: path
 *           name: hotel-id
 *           required: true
 *           description: The ID of the hotel to retrieve
 *           schema:
 *             type: string  # or whatever type hotel-id is
 *       responses:
 *         200:
 *           description: Hotel document retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetAllHotelsResponse'
 *         402:
 *           description: Failed to fetch user document
 *         400:
 *           description: Bad request
 */


router.get(`/get-a-hotel/:hotel-id`,verifyJwt,getAHotel)

router.get('/get-all-hotel-details/:hotel_id',verifyJwt,getAllHotelDetails)

router.delete('/delete-image/:hotel_id/:img_public_id',verifyJwt,deleteHotelImage)

router.put('/change-hotel-status/:hotel_id/:status',verifyJwt,changeHotelStatus)

router.get('/get-all-hotels-user',getAllHotelsForUser)
router.get('/get-a-hotel-user/:hotel_id',checkAvailability,getAHotelForUser)

router.get('/get-a-hotel-for-owner/:hotel_id',verifyJwt,getAHotel)

  router.post('/test',(req,res)=>{
    console.log(req.body)
  })

//owner 
router.put('/edit-hotel-details/:hotel_id',verifyJwt,editHotelName)
router.put('/add-images',verifyJwt,uploader.array('images',10),addHotelImages)
router.put('/edit-hotel-location/:hotel_id',verifyJwt,editHotelLocation)
router.put('/edit-hotel-description/:hotel_id',verifyJwt,editHotelDescription)
  

/**
 * @openapi
 * paths:
 *   '/api/user/edit-hotel/{hotel-id}':
 *     put:
 *       tags:
 *         - Hotel
 *       summary: edit details of a hotel
 *       parameters:
 *         - in: path
 *           name: hotel-id
 *           required: true
 *           description: The ID of the hotel to retrieve
 *           schema:
 *             type: string  # or whatever type hotel-id is
 *       responses:
 *         200:
 *           description: Hotel document edited successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetAllHotelsResponse'
 *         402:
 *           description: Failed to edit hotel document
 *         400:
 *           description: Bad request
 */

router.put('/edit-hotel/:hotel_id',uploader.array('images',10), editHotel)


/**
 * @openapi
 * paths:
 *   '/api/user/add-hotel':
 *     post:
 *       tags:
 *         - Hotel
 *       summary: add a hotel to database
 *       responses:
 *         200:
 *           description: Hotel document added successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetAllHotelsResponse'
 *         402:
 *           description: Failed to added hotel document
 *         400:
 *           description: Bad request
 */


router.post('/add-hotel',uploader.array('images',10),createHotel)


/**
 * @openapi
 * paths:
 *   '/api/user/delete-hotel/{hotel-id}':
 *     delete:
 *       tags:
 *         - Hotel
 *       summary: Delete Hotel by ID
 *       parameters:
 *         - in: path
 *           name: hotel-id
 *           required: true
 *           description: The ID of the hotel to delete
 *           schema:
 *             type: string  # or whatever type hotel-id is
 *       responses:
 *         200:
 *           description: hotel deleted successfully
 *         402:
 *           description: Failed to delete hotel
 *         400:
 *           description: Bad request
 */

router.delete('/delete-hotel',(req,res)=>{
    res.status(200).json({message:'hotel deleted successfully'});
})

router.get('/get-rating/:hotel_id',getRatingOfAHotel)

module.exports=router;