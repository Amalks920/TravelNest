const { uploadImages } = require("../helpers/hotelHelper")
require('dotenv').config()


const createHotel=async (req,res,next)=>{
    try {
      const hotelImgArray=await uploadImages(req.files)
      console.log(process.env.IMAGE_BASE_URL)
      let imgBaseUrlLength=process.env.IMAGE_BASE_URL.length
      
      let imgStringArr=[]
      for(var i=0;i<hotelImgArray.length;i++){
        imgStringArr.push(hotelImgArray[i].public_id+'.png')
      }

      const response=await saveHotelDocument()

      res.status(200).json({msg:'sucess'})
    } catch (error) {
       console.log(error) 
    }
}


module.exports={
    createHotel
}