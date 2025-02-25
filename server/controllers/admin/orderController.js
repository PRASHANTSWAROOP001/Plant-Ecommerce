const Order = require("../../models/Order")

const getAllOrders = async (req, res) => {

    try {
        
        const order = await Order.find({});

        if(!order.length){
            return res.status(404).json({
                success:false,
                message:"orders could not be found"
            })
        }

        return res.status(200).json({
            success:true,
            data:order
        })

    } catch (error) {

        console.error("Error happend while fetching all orders: ", error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
}


const getOrderDetailsForAdmin = async (req, res) => {
    try {
      const { id } = req.params;
  
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found!",
        });
      }
  
      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
};


const updateOrderStatus = async (req,res) => {
  try {
    
    const {id} = req.params;

    const {orderStatus} = req.body;

    const order = await Order.findById(id);

    if(!order){
      return res.status(404).json({
        success:false,
        message:"order could not be found in database."
      })
    }

    await Order.findByIdAndUpdate(id, {orderStatus})

    return res.status(200).json({
      success:true,
      message:"order updated successfully"
    })


  } catch (error) {
    
    console.error("Error happend while updating status: ", error)
    return res.status(500).json({
      success:false,
      message:"internal server error while updating status"
    })
  }
}


module.exports = {
    getAllOrders,
    getOrderDetailsForAdmin,
    updateOrderStatus
}
