const { fetchAllUsersHelper, blockOrUnblockUserHelper, checkUserBlockedOrNotHelper } = require("../helpers/userHelper")


const getAllUsers=async (req,res,next)=>{
    try {
       const response=await fetchAllUsersHelper()
       res.status(200).json({response})
    } catch (error) {
        res.status(200).json({error})
    }
}

const blockOrUnblockUser=async (req,res,next)=>{
    let user_id=req.params.user_id
    let isBlocked=req.body.isBlocked
    try {
        const response=await blockOrUnblockUserHelper(user_id,isBlocked)
        res.status(200).json({response});
    } catch (error) {
        res.status(200).json({error})
    }
}

const checkIfUserBlockedOrNot=async (req,res,next)=>{
    let user_id=req.params.user_id;

    try { 
        const response=await checkUserBlockedOrNotHelper(user_id)
        console.log(response)
        res.status(200).json({response})
    } catch (error) {
        res.status(404).json({error})
    }
}


module.exports={
    getAllUsers,blockOrUnblockUser,
    checkIfUserBlockedOrNot
}