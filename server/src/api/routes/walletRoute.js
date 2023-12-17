const express=require('express')
const router=express.Router()


/**
 * @openapi
 * paths:
 *   '/api/user/update-wallet/{amount}':
 *     patch:
 *       tags:
 *         - Wallet
 *       summary: Add amount to wallet
 *       parameters:
 *         - in: path
 *           name: amount
 *           required: true
 *           description: amount which should be added from wallet
 *           schema:
 *             type: string  # or whatever type wallet is
 *       responses:
 *         200:
 *           description: wallet amount added  successfully
 *         402:
 *           description: Failed to add to wallet
 *         400:
 *           description: Bad request
 */


router.patch('/update-wallet/{amount}',(req,res)=>{
    res.status(200).json({})
})

module.exports=router;