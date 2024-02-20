const { getSalesReportHelper, getSalesReportByDateHelper, getSalesReportForOwnerHelper, getSalesReportForOwnerHotelsHelper } = require("../helpers/salesHelper")


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

module.exports={
    getSalesReport,getSalesReportByDate,
    getSalesReportForOwner,
    getSalesReportForOwnerHotels
    
}