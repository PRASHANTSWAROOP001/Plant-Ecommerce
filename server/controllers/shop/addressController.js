const Address = require("../../models/Address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
     //console.log(userId, address, city, pincode, phone ,notes);

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    const savedAddress = await newAddress.save();
    res.status(201).json({
        success:true,
        message:"data saved successfully",
        data: savedAddress
    });
  } catch (error) {
    console.error("Error happened while saving the new address", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    // console.log(formData);

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "userId and addressId both are required. Could be missing one."
      });
    }

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId: userId },
      formData,
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address could not be found for updation."
      });
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress
    });
  } catch (error) {
    console.error("Error happened while trying to update the address.", error);
    res.status(500).json({
      success: false,
      message: "Error happened while updating the address",
      error
    });
  }
};

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


        const addressList = await Address.find({userId:userId});

        res.status(200).json({
            success:true,
            data:addressList
        })

        
    } catch (error) {
        console.error("Error happend while fetching the address for the user", error);

        res.status(500).json({
            success:false,
            message:"Error happend while fetching the address",
            error
        })
        
    }
}

module.exports = {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAddress,
};