const express = require("express");
const router = express.Router();

// serve home page
router.get("/", (req, res) => {
    res.render("pages/index")
})

// result page
router.get("/english-malayalam/:word", (req, res) => {
    res.render("pages/result")
})

module.exports = router