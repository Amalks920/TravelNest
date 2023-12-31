const express=require('express')
const router=express.Router()

/**
 * @openapi
 * openapi: 3.0.0
 * info:
 *   title: Hotel Sales API
 *   version: 1.0.0
 * paths:
 *   '/api/sales/get-sales/{hotelId}':
 *     get:
 *       tags:
 *         - Sales
 *       summary: Get sales details by hotel ID
 *       parameters:
 *         - in: path
 *           name: hotelId
 *           required: true
 *           description: ID of the hotel to retrieve sales data for
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response with sales details
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetSalesByHotelResponse'
 *         '404':
 *           description: Hotel not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Hotel not found
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Internal server error
 * components:
 *   schemas:
 *     GetSalesByHotelResponse:
 *       type: object
 *       properties:
 *         hotelId:
 *           type: string
 *           description: ID of the hotel
 *         sales:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Unique identifier for the sale
 *               product:
 *                 type: string
 *                 description: Name of the product
 *               amount:
 *                 type: number
 *                 description: Amount of the sale
 *       required:
 *         - hotelId
 *         - sales
 */

router.get('/get-sales/{hotle-id}',(req,res)=>{
    res.status(200).json({})
})

module.exports=router