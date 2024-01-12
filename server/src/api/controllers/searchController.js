const { findHotelByLocationHelper, searchHotels } = require("../helpers/hotelHelper");




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

    try {
       const response=await searchHotels()
       res.status(200).json({response})
    } catch (error) {
        res.status(404).json({error});
    }
}


module.exports={
    searchController,roomSearchController
}