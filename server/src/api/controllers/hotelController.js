const { getHotelsHelper } = require("../helpers/hotelHelper")
const { saveHotelDocumentHelper } = require("../helpers/hotelHelper")
const { uploadImages } = require("../helpers/hotelHelper")
require('dotenv').config()


const createHotel=async (req,res,next)=>{
  const {hotelName,description,location}=req.body
    try {
      const hotelImgArray=await uploadImages(req.files)
      console.log(process.env.IMAGE_BASE_URL)
      let imgBaseUrlLength=process.env.IMAGE_BASE_URL.length
      
      let imgStringArr=[]
      for(var i=0;i<hotelImgArray.length;i++){
        imgStringArr.push(hotelImgArray[i].public_id+'.png')
      }

      let data={
        hotelName,
        description,
        location,
        images:imgStringArr
      }
      const response=await saveHotelDocumentHelper(data)
      
      res.status(200).json({response})
    } catch (error) {
       console.log(error) 
    }
}

getAllHotels=async (req,res,next)=>{
  try {
    const response=await getHotelsHelper()
    res.status(200).json({response})
  } catch (error) {
    res.status(404).json({error})
  }
    
}

module.exports={
    createHotel,getAllHotels,
    getAllHotels
}

