const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const User = require("../models/User")

const registerUser = async(req, res)=>{

    const {userName,email,password} = req.body

    try {
        const checkUser = await User.findOne({email:email})
        if(checkUser){
            return res.json({
                success:false,
                message:"Email already exists. Use different email."
            })
        }

        const hashPassword = await bcryptjs.hash(password,12)

        const newUser = new User({
            userName,
            email,
            password:hashPassword,
            role:"user"
        })

        await newUser.save()

        res.status(200).json({
            success:true,
            messsage:"user registered successfully"
        })

    } catch (error) {

        console.error("Error While Registering: ", error)
        res.status(500).json({
            success:false,
            message:"Error while Registering User"
        })
        
    }

}

const login = async(req,res)=>{

    const{email,password} = req.body;

    const checkUser = await User.findOne({email:email})

    if(!checkUser){
        res.json({
            success:false,
            message:"user is not registered with this email. Kindly Register."
        })
    }

    try {
        

        const checkPassword = await bcryptjs.compare(password, checkUser.password)

        if(!checkPassword){
            res.json({
                success:false,
                message:"Password Invalid."
            })
        }

        const token = jwt.sign(
            {
                id:checkUser._id,
                email:checkUser.email,
                role:checkUser.role
            },
            "Client_Secret_Key",
            {expiresIn:"60m"}

        )

        res.cookie("token", token, {httpOnly:true,secure:false}).json({
            success:true,
            message:"user is logged in successfully",
            user:{
                email:checkUser.email,
                id:checkUser._id,
                role:checkUser.role
            }
        })
    } catch (error) {

        console.error("error happend while logging: ", error);
        res.status(500).json({
            success:false,
            message:"Error while logging"
        })
        
    }

}


const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            success:false,
            message:"unauthorized users.",
        })
    }

    try {


        const decoded = jwt.verify(token,"Client_Secret_Key");
        req.user = decoded;
        next();
        
    } catch (error) {
        
        console.error("Error happend while auth check.", error);
        res.status(401).json({
           success:false,
           message:"Error while trying to authorize user."
        })
    }
}


const logout = async(req,res)=>{
    res.clearCookie("token").json({
        success:true,
        message:"user logged out successfully"
    })
}

module.exports = {registerUser,login,logout,authMiddleware}