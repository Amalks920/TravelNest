const { getHotelsHelper, getAHotelHelper, editHotelHelper, getAllHotelDetailsHelper } = require("../helpers/hotelHelper")
const { saveHotelDocumentHelper } = require("../helpers/hotelHelper")
const { uploadImages } = require("../helpers/hotelHelper")
const { findRoomsInHotelHelper } = require("../helpers/roomHelper")
require('dotenv').config()


const createHotel=async (req,res,next)=>{
  const {hotelName,description,location,owner_id}=req.body
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
        owner_id,
        images:imgStringArr
      }
      const response=await saveHotelDocumentHelper(data)
      console.log('rreeessspp=')
      console.log(response)
      res.status(200).json({response})
    } catch (error) {
       console.log(error) 
       res.status(404).json({error})
    }
}

const getAllHotels=async (req,res,next)=>{
  console.log(req.user)
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

const getAllHotelDetails=async (req,res,next)=>{
  let hotel_id=req.params.hotel_id;

  try {
    const hotel_details=await getAllHotelDetailsHelper(hotel_id)
    const room_details=await findRoomsInHotelHelper(hotel_id)
    res.status(200).json({hotel_details,room_details})
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
    getAllHotels,getAHotel,editHotel,
    getAllHotelDetails
}

