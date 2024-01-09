const { findHotelByLocationHelper } = require("../helpers/hotelHelper");




const searchController= async (req,res,next)=>{
    try {
        console.log(req.query)
        let location=req.query.location;
        const response=await findHotelByLocationHelper(location)

        res.status(200).json({response})
    } catch (error) {
        res.status(404).json({error})
    }
}


module.exports={
    searchController
}