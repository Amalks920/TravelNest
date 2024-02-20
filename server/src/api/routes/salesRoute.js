const express=require('express')
const { getSalesReport, getSalesReportByDate, getSalesReportForOwner, getSalesReportForOwnerHotels } = require('../controllers/salesController')
const verifyAdminJwt = require('../middlewares/verifyAdminJwt');
const verifyOwnerJwt = require('../middlewares/verifyOwnerJwt');
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

router.get('/get-all-sales-report-for-admin',verifyAdminJwt,getSalesReport);

router.get('/get-sales-by-date-admin/:startDate/:endDate',verifyAdminJwt,getSalesReportByDate)
router.get('/filter-owner-sales-by-date/:startDate/:endDate',verifyOwnerJwt,getSalesReportByDate)

router.get('/get-sales-report-booking/:hotel_id',verifyOwnerJwt,getSalesReportForOwner)
router.get('/get-sales-report-hotel-owner/:user_id',verifyOwnerJwt,getSalesReportForOwnerHotels)




module.exports=router