const express = require('express');
const router = express.Router();

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

router.get('/get-all-hotels',(req,res)=>{
    res.status(200).json({})
})


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


router.get(`/get-a-hotel/{hotel-id}`,(req,res)=>{
    res.status(200).json({})
  })



  

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

router.put('edit-hotel/{hotel-id}',(req,res)=>{
    res.status(200).json({})
})


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


router.post('/add-hotel',(req,res)=>{
 res.status(200).json({message:'hotel added'})   
})


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


module.exports=router;