const express = require("express")

const {registerUser, login, logout, authMiddleware} = require("../controllers/authController")

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", login)
router.post("/logout",logout )
router.get("/verifyUser", authMiddleware, (req, res)=>{
    const user = req.user;

    res.json({
        success:true,
        message:"Authenticated User",
        user:user
    })
})


module.exports = router;