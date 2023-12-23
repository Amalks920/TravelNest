const cloudinary=require('../../config/cloudinary')
const hotelModel=require('../models/hotelModel')

const uploadImages=(files)=>{
    return new Promise(async (resolve,reject)=>{
        let cloudImgArray=[]
        try {
            for(var i=0;i<files.length;i++){
                cloudImage = await cloudinary.uploader.upload(files[i].path, {
                    timeout: 60000,
                  });
                  cloudImgArray.push(cloudImage)
            }
            console.log(cloudImgArray)
            resolve(cloudImgArray)

        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const saveHotelDocumentHelper = function (data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await hotelModel.create(data)
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

const getHotelsHelper=function (id=null){
    return new Promise(async (resolve,reject)=>{
        try {
        const hotels=await hotelModel.find({});
            resolve(hotels)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports={
    uploadImages,
    saveHotelDocumentHelper,getHotelsHelper
}