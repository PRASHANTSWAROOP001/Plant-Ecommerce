const cloudinary = require("cloudinary").v2;
const multer = require("multer")


const api_key= process.env.API_KEY;
const api_secret_key = process.env.API_SECRET_KEY
const cloud_name = process.env.CLOUD_NAME


cloudinary.config({
    cloud_name:cloud_name,
    api_key:api_key,
    api_secret_key:api_secret_key
})

const storage = new multer.memoryStorage();

const upload = multer({storage})


async function imageUploadUtil(file){

    const result = await cloudinary.uploader.upload(file,{
        resource_type:"auto"
    });

    return result;
}


module.exports = {imageUploadUtil, upload}
