const { findHotelByLocationHelper,searchHotels } = require("../helpers/hotelHelper");
const { searchRoomsHotel } = require("../helpers/roomHelper");




const searchController= async (req,res,next)=>{
    try {
        const collisions=res.locals.existingCollisions
        console.log(req.query)
        let location=req.query.location;
        let checkIn=req.query.checkIn || null;
        let checkOut=req.query.checkOut || null;

        const response=await findHotelByLocationHelper(location,collisions)

        res.status(200).json({response})
    } catch (error) {
        res.status(404).json({error})
    }
}

const roomSearchController= async (req,res,next)=>{
    const collisions=res.locals.existingCollisions;
    const location=req.query.location;

    try {
       const response=await searchRoomsHotel(location,collisions)
       res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(404).json({error});
    }
}


module.exports={
    searchController,roomSearchController
}