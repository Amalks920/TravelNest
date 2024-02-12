const { getSalesReportHelper, getSalesReportByDateHelper } = require("../helpers/salesHelper")


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


module.exports={
    getSalesReport,getSalesReportByDate
}