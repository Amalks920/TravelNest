const { findHotelByLocationHelper,searchHotels } = require("../helpers/hotelHelper");
const { searchRoomsHotel } = require("../helpers/roomHelper");




const searchController= async (req,res,next)=>{
    try {
        const collisions=res.locals.existingCollisions
        console.log(req.query)
        let location=req.query.location;
        let checkIn=req.query.checkIn || null;
        let checkOut=req.query.checkOut || null;
        const roomType=req.query.roomType || null;
        const priceRange=JSON.parse(req.query.priceRange) || null;
    
      
        const response=await findHotelByLocationHelper(location,collisions,roomType,priceRange);

        res.status(200).json({response})
    } catch (error) {
        res.status(404).json({error})
    }
}

const roomSearchController= async (req,res,next)=>{
    const collisions=res.locals.existingCollisions;
    const location=req.query.location;
    const roomType=req.query.roomType || null;
    const priceRange=req.query.priceRange?JSON.parse(req.query.priceRange):  null;

    try {
       const response=await searchRoomsHotel(location,collisions,priceRange,roomType)
       res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(404).json({error});
    }
}


module.exports={
    searchController,roomSearchController
}