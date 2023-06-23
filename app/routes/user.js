const express = require("express");
const router = express.Router();

// serve register page
router.get("/register" , (req, res) => {
    res.render("user/register")
})

// serve login page
router.get("/login" , (req, res) => {
    res.render("user/login")
})

module.exports = router