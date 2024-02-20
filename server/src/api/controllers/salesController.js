const { getAllHotelIdsHelper } = require("../helpers/hotelHelper")
const { getSalesReportHelper, getSalesReportByDateHelper, getSalesReportForOwnerHelper, getSalesReportForOwnerHotelsHelper, getSalesPerTwoWeekHelper, getSalesPerMonthHelper, getSalesPerDayHelper, getYearlyReportHelper } = require("../helpers/salesHelper")


const getSalesReport=async (req,res)=>{
    try {
        
        const response=await getSalesReportHelper()
        res.status(200).json({response})
    } catch (error) {
        res.status(500).json({error})
    }
}

const getSalesReportByDate=async (req,res)=>{

    const startDate=req.params.startDate;
    const endDate=req.params.endDate;

    try {
        const response=await getSalesReportByDateHelper(startDate,endDate)
        
        res.status(200).json({response})
    } catch (error) {
        res.status(500).json({error})
    }
}

const getSalesReportForOwner= async (req,res)=>{

    const hotel_id=req.params.hotel_id;

    try {
    const response=await getSalesReportForOwnerHelper(hotel_id)  
    res.status(200).json({response})
    } catch (error) {
        res.status(500).json({error})
    }
}

const getSalesReportForOwnerHotels = async (req,res) =>{
    const user_id=req.params.user_id
    try {
        const response=await getSalesReportForOwnerHotelsHelper(user_id)
        res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

const getSalesPerTwoWeek= async (req,res)=>{
    try {
    const owner_id=req.params.owner_id
    const hotelIdArray=await getAllHotelIdsHelper(owner_id)
     const response = await getSalesPerTwoWeekHelper(hotelIdArray)
     res.status(200).json({response})
    } catch (error) {
        res.status(500).json({error})
    }
}
const getSalesPerMonth= async (req,res)=>{
    try {
    const owner_id=req.params.owner_id
    const hotelIdArray=await getAllHotelIdsHelper(owner_id)
     const response = await getSalesPerMonthHelper(hotelIdArray)
     res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
const getSalesPerDay= async (req,res)=>{
    try {
    const owner_id=req.params.owner_id
    const hotelIdArray=await getAllHotelIdsHelper(owner_id)
     const response = await getSalesPerDayHelper(hotelIdArray)
     res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}
const getSalesPerYear= async (req,res)=>{
    try {
    const owner_id=req.params.owner_id
    const hotelIdArray=await getAllHotelIdsHelper(owner_id)
     const response = await getYearlyReportHelper(hotelIdArray)
     
     res.status(200).json({response})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}





module.exports={
    getSalesReport,getSalesReportByDate,
    getSalesReportForOwner,
    getSalesReportForOwnerHotels,
    getSalesPerTwoWeek,
    getSalesPerMonth,
    getSalesPerDay,getSalesPerYear
}