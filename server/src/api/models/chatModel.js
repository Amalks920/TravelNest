const mongoose=require('mongoose')


const chatSchema=mongoose.Schema({
    participants:{
        type:Array,
        required:true,
        default:[]
    },
    createdAt:{
        type:ObjectId,
        required:true
    }
})

module.exports=mongoose.Model('Chat',chatSchema)