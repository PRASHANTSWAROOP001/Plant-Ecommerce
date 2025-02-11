const { Product } = require("../../models/Product");


const getFilteredProducts = async(req, res)=>{

    const {category=[], brand=[],sortBy="price-asc"} = req.query;

    console.log(req.query)

    let filters = {};

    // Convert category to an array if it's a string
    if (category.length > 0) {
        filters.category = { $in: Array.isArray(category) ? category : category.split(",") };
    }

    // Convert brand to an array if it's a string
    if (brand.length > 0) {
        filters.brand = { $in: Array.isArray(brand) ? brand : brand.split(",") };
    }

    console.log("Received Query Params:", req.query); 


    console.log(filters)

    let sort = {}

    switch(sortBy){
        case "price-asc":
            sort.price = 1
            break;
        case "price-desc":
            sort.price = -1
            break;
        case "name-asc":
            sort.title =1
            break;
        case "name-desc":
            sort.title=-1
            break;
        default:
            sort.price = 1
            break;   

    }

    try {

        const product = await Product.find(filters).sort(sort)

        res.status(200).json({
            success:true,
            message:"Data fetched successfully",
            data:product
        })

        console.log(product)
        
    } catch (error) {
        console.error("Error happpend while getting products: ", error);
        res.status(500).json({
            success:false,
            message:"Error happend while fetching products"
        })
    }
}


module.exports = {getFilteredProducts}