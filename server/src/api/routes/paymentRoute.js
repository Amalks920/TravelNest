const express=require('express')
const { payment } = require('../controllers/paymentController')
const router=express.Router()
const verifyJwt = require('../utils/verifyJwt');
const checkAvailability = require('../middlewares/checkAvailability');


router.post('/payment',verifyJwt,checkAvailability,payment)

module.exports=router
