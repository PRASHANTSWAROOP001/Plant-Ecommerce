const Cart = require("../../models/Cart")
const Product = require("../../models/Product")



const addToCart = async (req, res)=>{

    
   try {

    const {userId, productId, quantity} = req.body;

    if(!userId || !productId || quantity <= 0){
        return res.status(400).json({
            success:false,
            message:"Invalid data provided"

        })
    }

    const addedProduct = await Product.findById(productId)

    if(!addedProduct){
        return res.status(404).json({
            success:false,
            message:"Product Could Not Be Found."
        })
    }


    let cart = await Cart.findOne({userId})

    if(!cart){
        cart = new Cart({userId,items:[]})
    }

    const findCurrentProductIndex = cart.items.findIndex( (item)=> item.productId.toString() === productId)

    if (findCurrentProductIndex === -1){
        cart.items.push({productId,quantity})
    }else{
        cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save()

    return res.status(200).json({
        success:true,
        data:cart
    })

    
   } catch (error) {
    console.error("Error happend while adding or creating a product:", error);

    res.json(500).json({
        success:false,
        message:"Error happend while adding/creating cart instance",
        error
    })
   }
}


const fetchCart = async(req, res)=>{
    try {

        const {userId} = req.params;

        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User id is mandatory"
            })
        }

        const cart = await Cart.findOne({userId}).populate({
            path : "items.productId",
            select:"imageUrl name price sellPrice"
        })

        if(!cart){
            return res.status(400).json({
                success:false,
                message:"cart not avilable for user."
            })
        }


        const validItems = cart.items.filter(productItem=> productItem.id);

        if(validItems.length < cart.items.length ){
            cart.items = validItems;
            await cart.save()
        }

        const populateCartItems = validItems.map(item=>({
            productId: item.productId._id,
            imageUrl: item.productId.imageUrl[0],
            sellPrice: item.productId.sellPrice,
            price: item.productId.price,
            name:item.productId.name,
            quantity:item.quantity
        }))

        res.status(200).json({ 
            success:true,
            data:{
                ...cart._doc,
                items:populateCartItems
            }
        })
        
    } catch (error) {

    console.error("Error happend while fetching cart data:", error);

    res.json(500).json({
        success:false,
        message:"Error happend while adding/creating cart instance",
        error
    })
        
    }
}


const deleteCartItems = async(req, res)=>{
    try {

        const {userId, productId} = req.params;

        if(!userId || !productId){
            return res.status(400).json({
                success:false,
                message:"Invalid data provided"
    
            })
        }

        const cart = await Cart.findOne({userId}).populate({
            path:"items.productId",
            select:"imageUrl[0] name price sellPrice"
        })

        if(!cart){
            return res.status(400).json({
                success:false,
                message:"cart not avilable for user."
            })
        }


        
    } catch (error) {
        
    }
}


const updateCartItemsQuantity = async (req,res)=>{
    try {

        const {userId, productId, quantity} = req.body;

        if(!userId || !productId || quantity <= 0){
            return res.status(400).json({
                success:false,
                message:"Invalid data provided"
    
            })
        }


        const cart = await Cart.findOne({userId})

        if(!cart){
            return res.status(404).json({
                success:false,
                message:"Cart not found for user"
            })
        }

        const findCurrentProductIndex = cart.items.findIndex((product)=>product.productId.toString() === productId )

        if(findCurrentProductIndex === -1){
            return res.status(404).json({
                success:false,
                message:"product could now be found"
            })
        }

        cart.items[findCurrentProductIndex].quantity = quantity

        await cart.save()

        await cart.populate({
            path:"items.productId",
            select:"imageUrl name price sellPrice"

        })

        const populateCartItems = validItems.map(item=>({
            productId: item.productId ? item.productId._id : null,
            imageUrl: item.imageUrl ? item.productId.imageUrl[0]:null,
            sellPrice: item.sellPrice? item.productId.sellPrice : null,
            price: item.price ? item.productId.price : null,
            name:item.name ? item.productId.name : null,
            quantity:item.quantity
        }))

        res.status(200).json({ 
            success:true,
            data:{
                ...cart._doc,
                items:populateCartItems
            }
        })

        
    } catch (error) {
        
    }
}