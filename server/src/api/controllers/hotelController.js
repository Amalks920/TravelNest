const { getHotelsHelper, getAHotelHelper, editHotelHelper } = require("../helpers/hotelHelper")
const { saveHotelDocumentHelper } = require("../helpers/hotelHelper")
const { uploadImages } = require("../helpers/hotelHelper")
require('dotenv').config()


const createHotel=async (req,res,next)=>{
  const {hotelName,description,location}=req.body
    try {
      const hotelImgArray=await uploadImages(req.files)
      
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

const getAllHotels=async (req,res,next)=>{
  try {
    const response=await getHotelsHelper()
    res.status(200).json({response})
  } catch (error) {
    console.log(error.message)
    res.status(404).json({error})
  }
    
}

const getAHotel=async (req,res,next)=>{
  let hotel_id=req.params.hotel_id
  try {
    const response=await getAHotelHelper(hotel_id)
    res.status(200).json({response})
  } catch (error) {
    console.log(error)
    res.status(404).json({error})
  }
   
}

const editHotel=async (req,res,next)=>{
  let hotel_id=req.params.hotel_id
  let files=req.files
  try {

    const hotelImgArray=await uploadImages(req.files)
      
    let imgStringArr=[]
    for(var i=0;i<hotelImgArray.length;i++){
      imgStringArr.push(hotelImgArray[i].public_id+'.png')
    }

    const response=await editHotelHelper(req.body,imgStringArr)
    res.status(200).json({response:true})
  } catch (error) {
    console.log(error)
    res.status(404).json({error})
  }
}




module.exports={
    createHotel,getAllHotels,
    getAllHotels,getAHotel,editHotel
}

