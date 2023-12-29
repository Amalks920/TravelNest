const userModel=require('../models/userModel')


const fetchAllUsersHelper=()=>{
        return new Promise(async (resolve,reject)=>{
            try {
            const allUsers=await userModel.find({role:{$ne:'admin'}})
            .select('username email phone isBlocked role timestamps')

               resolve(allUsers) 
            } catch (error) {
                reject(error)
            }
        })
}

const blockOrUnblockUserHelper=(user_id,isBlocked)=>{
    return new Promise(async (resolve,reject)=>{
        try {
        const response=await userModel.updateOne({_id:user_id},{isBlocked:isBlocked})
           resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

const checkUserBlockedOrNotHelper=(user_id)=>{
    return new Promise( async (resolve,reject)=>{
        try {
            const response=await userModel.findOne({_id:user_id})
            if(response.isBlocked){
                resolve(true)
            }else{
                resolve(false)
            }
            
        } catch (error) {
            reject(error)
        }
    })
}

const findUserHelper=(email)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const user=await userModel.findOne({email:email}) 
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}


module.exports={
    fetchAllUsersHelper,blockOrUnblockUserHelper,
    checkUserBlockedOrNotHelper,findUserHelper
}