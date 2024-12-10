// files and required package import

const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")


// router imports

const authRouter = require("./routes/auth_routes")

const adminProductsRouter = require("./routes/admin/admin_productRoute")



// api useage code 

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"], // Add OPTIONS
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}))


app.use(cookieParser())





const mongoDbUrl = process.env.MONGO_DB_URL;
// console.log(mongoDbUrl)
const connectToDb = async(url)=>{
    try {
        
        console.log("Trying To Connect To MongoDb.");
        await mongoose.connect(url);
        console.log("connected to database successfully.")
    } catch (error) {

        console.log("Error happend while connecting to monogodb database. ", error);
        
    }
}

connectToDb(mongoDbUrl);

const port = process.env.PORT || 5000


app.listen(port, ()=>{
    console.log("server started listening at port", port)
})


app.use(express.json())

app.use("/api/auth", authRouter);

app.use("/api/admin", adminProductsRouter)








