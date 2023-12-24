const { addRoomHelper, addRoomToHotel, getRoomsHelper } = require("../helpers/roomHelper");
const {uploadImages}=require('../helpers/hotelHelper');

const addRoom = async (req, res, next) => {
  try {
    const hotelImgArray = await uploadImages(req.files);
    console.log(process.env.IMAGE_BASE_URL);
    let imgBaseUrlLength = process.env.IMAGE_BASE_URL.length;

    let imgStringArr = [];
    for (var i = 0; i < hotelImgArray.length; i++) {
      imgStringArr.push(hotelImgArray[i].public_id + ".png");
    }

    req.body.images = imgStringArr;
    const response = await addRoomHelper(req.body);

    res.status(200).json({ response });
  } catch (error) {
    console.log('id errorrr')
    console.log(error)
    res.status(400).json({ error });
  }
};


const getRooms = async (req,res,next)=>{
    console.log('jsdljdslk')
    try {
        const hotel_id=req.params.hotel_id
        const response = await getRoomsHelper(hotel_id) 
        res.status(200).json({response})
    } catch (error) {
        res.status(404).json({error})
    }
}

module.exports = {
  addRoom,getRooms
};
