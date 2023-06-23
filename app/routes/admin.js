const express = require("express");
const router = express.Router();

// serve login page
router.get("/login" , (req, res) => {
    res.render("admin/login")
})

module.exports = router