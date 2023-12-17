const express = require('express');
const router = express.Router();

/**
 * @openapi
 * paths:
 *   '/api/user/edit-user/{user-id}':
 *     put:
 *       tags:
 *         - User
 *       summary: Edit user details by ID
 *       parameters:
 *         - in: path
 *           name: user-id
 *           required: true
 *           description: The ID of the user to edit
 *           schema:
 *             type: string  # or whatever type user-id is
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EditUserInput'
 *       responses:
 *         200:
 *           description: User details edited successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/EditUserResponse'
 *         402:
 *           description: Failed to edit user details
 *         400:
 *           description: Bad request
 */


 router.put(`/edit-user/{user-id}`, (req, res) => {
    res.status(200).json({ message: 'user details edited successfully' });
});


/**
 * @openapi
 * paths:
 *   '/api/user/delete-user/{user-id}':
 *     delete:
 *       tags:
 *         - User
 *       summary: Delete user by ID
 *       parameters:
 *         - in: path
 *           name: user-id
 *           required: true
 *           description: The ID of the user to delete
 *           schema:
 *             type: string  # or whatever type user-id is
 *       responses:
 *         200:
 *           description: User deleted successfully
 *         402:
 *           description: Failed to delete user
 *         400:
 *           description: Bad request
 */


router.delete(`/delete-user/{user-id}`,(req,res)=>{
  res.status(200).json({message:'user successfully deleted'})
})

/**
 * @openapi
 * paths:
 *   '/api/user/block-user/{user-id}':
 *     put:
 *       tags:
 *         - User
 *       summary: Block user by ID
 *       parameters:
 *         - in: path
 *           name: user-id
 *           required: true
 *           description: The ID of the user to block
 *           schema:
 *             type: string  # or whatever type user-id is
 *       responses:
 *         200:
 *           description: User blocked successfully
 *         402:
 *           description: Failed to block user
 *         400:
 *           description: Bad request
 */


router.put('/block-user/:user-id',(req,res)=>{
  res.status(200).json({message:'user blocked successfully'})
})


/**
 * @openapi
 * paths:
 *   '/api/user/unblock-user/{user-id}':
 *     put:
 *       tags:
 *         - User
 *       summary: Unblock user by ID
 *       parameters:
 *         - in: path
 *           name: user-id
 *           required: true
 *           description: The ID of the user to unblock
 *           schema:
 *             type: string  # or whatever type user-id is
 *       responses:
 *         200:
 *           description: User unblocked successfully
 *         402:
 *           description: Failed to unblock user
 *         400:
 *           description: Bad request
 */


 router.put(`/unblock-user/{user-id}`,(req,res)=>{
  res.status(200).json({message:'user unblocked successfully'})
})

 /**
   * @openapi
   * '/api/user/get-all-users':
   *  get:
   *     tags:
   *     - User
   *     summary: get all users
   *     responses:
   *      200:
   *        description: users documents got successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/GetAllUsersResponse'
   *      402:
   *        description:  failed to fetch
   *      400:
   *        description: Bad request
   */

router.get('/get-all-users',(req,res)=>{
  res.status(200).json({})
})

/**
 * @openapi
 * paths:
 *   '/api/user/get-a-user/{user-id}':
 *     get:
 *       tags:
 *         - User
 *       summary: Get a user by ID
 *       parameters:
 *         - in: path
 *           name: user-id
 *           required: true
 *           description: The ID of the user to retrieve
 *           schema:
 *             type: string  # or whatever type user-id is
 *       responses:
 *         200:
 *           description: User document retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetAllUsersResponse'
 *         402:
 *           description: Failed to fetch user document
 *         400:
 *           description: Bad request
 */


router.get(`/get-a-user/{user-id}`,(req,res)=>{
  res.status(200).json({})
})

/**
 * @openapi
 * paths:
 *   '/api/user/add-to-favorites/{hotel-id}':
 *     patch:
 *       tags:
 *         - User
 *       summary: Add a hotel to favorites
 *       parameters:
 *         - in: path
 *           name: hotel-id
 *           required: true
 *           description: The ID of the hotel which we need to add to favorites
 *           schema:
 *             type: string  # or whatever type hotel-id is
 *       responses:
 *         200:
 *           description: hotel added to favorites successfully
 *         402:
 *           description: Failed to add to favorites
 *         400:
 *           description: Bad request
 */


router.patch('/add-to-favorites',(req,res)=>{
  res.status(200).json({})
})

/**
 * @openapi
 * paths:
 *   '/api/user/remove-from-favorites/{hotel-id}':
 *     delete:
 *       tags:
 *         - User
 *       summary: remove a hotel from favorites
 *       parameters:
 *         - in: path
 *           name: hotel-id
 *           required: true
 *           description: The ID of the hotel which we need to remove hotel from favorites
 *           schema:
 *             type: string  # or whatever type hotel-id is
 *       responses:
 *         200:
 *           description: hotel removed from favorites successfully
 *         402:
 *           description: Failed to rmove from favorites
 *         400:
 *           description: Bad request
 */


router.delete('/remove-from-favorites/{hotle-id}',(req,res)=>{
  res.status()
})

module.exports=router;