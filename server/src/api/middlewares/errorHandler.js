const { validationResult } = require("express-validator");

const handleError=(req,res,next)=>{
const errors=validationResult(req);

if(!errors.isEmpty()){
    return res.json({
        data:{},
        message:'validation error',
        errors:errors.array()
    },
    422
    )
}else{
next()
}

}


module.exports=handleError;