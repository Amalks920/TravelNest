const mongoose=require('mongoose')


/**
 * @openapi
 * components:
 *  schemas:
 *    CreateMessageResponse:
 *      type: object
 *      required:
 *        - userId
 *        - message
 *        - chat
 *      properties:
 *        userId:
 *          type: number
 *          default: 49384848848
 *        message:
 *          type: string
 *          default: hello amal
 *        chat:
 *          type: number
 *          default: 4938484884842988
 */

const messageModel=mongoose.Schema({
    user_id:{
        type:ObjectId,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    chat:{
        type:ObjectId,
        required:true,
        ref:'chat'
    }
})


module.exports=mongoose.Model('Message',messageModel)