const express = require('express');
const router = express.Router();





/**
 * @openapi
 * paths:
 *   '/api/booking/create-booking':
 *     post:
 *       tags:
 *         - booking
 *       summary: create booking
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllBookingResponse'
 *       responses:
 *         200:
 *           description: create booking document
 *         402:
 *           description: Failed to get booking details
 *         400:
 *           description: Bad request
 */

router.post('/create-booking',(req,res)=>{
    res.status(200).json({})
})

/**
 * @openapi
 * paths:
 *   '/api/booking/get-all-bookings':
 *     get:
 *       tags:
 *         - booking
 *       summary: book
 *       responses:
 *         200:
 *           description: get-all-bookings
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetAllBookingResponse'
 *         402:
 *           description: Failed to get booking details
 *         400:
 *           description: Bad request
 */

router.get('/get-all-bookings',(req,res)=>{
    res.status(200).json({})
});

/**
 * @openapi
 * paths:
 *   '/api/booking/get-booking/{user-id}':
 *     get:
 *       tags:
 *         - booking
 *       summary: get booking details of  a user
 *       parameters:
 *         - in: path
 *           name: user-id
 *           required: true
 *           description: id of user
 *           schema:
 *             type: string  # or whatever type hotel-id is
 *       responses:
 *         200:
 *           description: get-user-booking
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetAllBookingResponse'
 *         402:
 *           description: Failed to get booking details
 *         400:
 *           description: Bad request
 */
router.get('/get-booking/{user-id}',(req,res)=>{
    res.status(200).json({})
})

/**
 * @openapi
 * paths:
 *   '/api/booking/cancel-booking/{booking-id}':
 *     put:
 *       tags:
 *         - booking
 *       summary: cancel booking
 *       parameters:
 *         - in: path
 *           name: booking-id
 *           required: true
 *           description: id of booking document
 *           schema:
 *             type: string  # or whatever type booking-id is
 *       responses:
 *         200:
 *           description: deleted booking document
 *         402:
 *           description: Failed to delete booking document
 *         400:
 *           description: Bad request
 */

router.put('/cancel-booking/{booking-id}',(req,res)=>{
    res.status(200).json({})
})

module.exports=router