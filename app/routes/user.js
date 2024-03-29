const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { authVerfication, getUser } = require("../utils/authUtils");
const { getUserContributions } = require("../controllers/userController");

// serve register page
router.get("/register" , (req, res) => {
    // response for not getting error in register page
    const response = { status: false }
    res.render("user/register",{ response })
})

// serve login page
router.get("/login" , (req, res) => {
    res.render("user/login")
})

// register route
router.post("/register", async (req, res) => {
    const response = await registerUser(req, res)
    // if register success set cookies
    if(response.status === true){
        res.cookie('Token', response.token);
        // if register success sent json response with user_name
        res.json(response)
    }else{
        // if register fail sent json reponse to client
        res.json(response)
    }
})


// login route
router.post("/login", async (req, res) => {
    const response = await loginUser(req, res)
    // if login success set cookies
    if(response.status === true){
        res.cookie('Token', response.token);
        // if login success sent json response with user_name
        res.json(response)
    }else{
        // if login fail sent json reponse to client
        res.json(response)
    }
})

// logout route
router.post("/logout" , (req, res) => {
    res.clearCookie("Token")
    res.redirect("/")
})

// serve dashboard page 
router.get("/dashboard", authVerfication, async (req, res) => {
    res.render("user/dashboard");
});

// serve contributions page
router.get("/contributions", authVerfication, async (req, res) => {
    const user = await getUser(req)
    const userContributions = await getUserContributions(user.data.id)
    res.render("user/contributions", userContributions)
})

// serve settings page
router.get("/settings/change-profile", authVerfication, async (req, res) => {
    res.render("user/settings");
})


module.exports = router