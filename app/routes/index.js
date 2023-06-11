const express = require("express");
const router = express.Router();
const path = require('path');

// defining html file path
const pages = path.join(__dirname, "../../pages/")

// serve home page
router.get("/", (req, res) => {
    res.send("HELLO")
})

module.exports = router