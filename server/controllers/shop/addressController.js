const Address = require("../../models/Address")

const addAddress = async (req, res)=>{

    try {
        
        const{userId, address, city, pincode, phone , notes} = req.body
        if(!userId || !address || !city || !pincode || !phone || !notes){
            res.status(400).json({
                success:false,
                message:"missing data provided check sent data"
            })
        }

    const newAddress = new Address({userId, address, city, pincode, phone, notes});

    await newAddress.save();

    return res.status(201).json({
        success:true,
        message: "address saved successfully"
    })

    } catch (error) {

        console.error("Error happend while saving the new address",error);
        res.status(500).json({
            success:false,
            message:"error happend",
            error
        })
        
    }
}


const editAddress = async (req, res)=>{
    try {
        
        const {userId, addressId} = req.params;

        const formData = req.body;

        if (!userId || !addressId){
            res.status(500).json({
                success:false,
                message: "userId and addressId both are required. could be missing one./"
            })
        }

        const updatedAddress = await Address.findOneAndUpdate({
            _id:addressId, userId: userId
        },formData,{new:true})

        if(!updatedAddress){
            res.status(404).json({
                success:false,
                message:"Address could not be found for updation."
            })
        }else{
            res.status(200).json({
                success:true,
                message:"address updated successfully"
            })
        }

    } catch (error) {
        console.error("Error happend while trying to update the address.");
        
        res.status(500).json({
            success:false,
            message:"Error happend while updating the address",
            error
        })
    }
}

const deleteAddress = async (req, res)=>{
    try {

        const {userId, addressId} = req.params;


        if (!userId || !addressId){
            res.status(500).json({
                success:false,
                message: "userId and addressId both are required. could be missing one./"
            })
        }
        
        const deletedAddress =  await Address.findOneAndDelete({_id:addressId, userId});

        if(!deletedAddress){
            res.status(404).json({
                success:false,
                message:"Address could not be found for updation."
            })
        }else{
            res.status(200).json({
                success:true,
                message:"address deletion successfully"
            })
        }

    } catch (error) {


        console.error("Error happend while trying to delete the address.");
        
        res.status(500).json({
            success:false,
            message:"Error happend while deleting the address",
            error
        })
    }
}


const fetchAddress = async (req, res)=>{
    try {

        const {userId} = req.params;

        if(!userId){
            res.status(400).json({
                success:false,
                message:"userId is missing for fetching data"
            })
        }


        const addressList = await Address.findById({userId});

        res.status(200).json({
            success:true,
            data:addressList
        })

        if(!addressList){
            res.status(404).json({
                success:false,
                message:"Address could not be found for the user."
            })
        }
        
    } catch (error) {
        console.error("Error happend while fetching the address for the user", error);

        res.status(500).json({
            success:false,
            message:"Error happend while fetching the address",
            error
        })
        
    }
}

module.exports = {addAddress, deleteAddress, fetchAddress, editAddress}