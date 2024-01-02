const {
  addRoomHelper,
  addRoomToHotel,
  getRoomsHelper,
  editRoomHelper,
  groupRoomByType,
} = require("../helpers/roomHelper");
const { uploadImages } = require("../helpers/hotelHelper");

const addRoom = async (req, res, next) => {
  try {
    console.log(req.body)
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
    console.log("id errorrr");
    console.log(error);
    res.status(400).json({ error });
  }
};

const editRoom = async (req, res, next) => {
console.log('sdlkdskjlkl')
  let hotel_id = req.params.hotel_id;
  let room_id = req.params.room_id;
  let files = req.files;

  try {

    const hotelImgArray = await uploadImages(files);

    let imgStringArr = [];
    for (var i = 0; i < hotelImgArray.length; i++) {
      imgStringArr.push(hotelImgArray[i].public_id + ".png");
    }

    const response = await editRoomHelper(hotel_id,room_id,req.body,imgStringArr);

    res.status(200).json({ response });
  } catch (error) {
    res.status(200).json({ error });
  }
};

const getRooms = async (req, res, next) => {
  console.log("jsdljdslk");
  try {
    const hotel_id = req.params.hotel_id;
    const response = await getRoomsHelper(hotel_id);
    res.status(200).json({ response });
  } catch (error) {
    res.status(404).json({ error });
  }
};


const getRoomsByType=async (req,res,next) => {
  let hotel_id=req.params.hotel_id
    try {
      console.log(res.cookies)
        const response=await groupRoomByType(hotel_id)
        res.status(200).json({response})
    } catch (error) {
      console.log(error)
      res.status(404).json({error})
    }
}

module.exports = {
  addRoom,editRoom,
  getRooms,getRoomsByType
};
