const express = require("express");
const { adminVerfication } = require("../utils/authUtils");
const { getNewMeanings } = require("../controllers/adminController");
const router = express.Router();

// serve new-meanings page
router.get("/new-meanings", adminVerfication, async (req, res) => {
    const newMeaningsData = await getNewMeanings()
   // console.log(newMeaningsData)
    res.render("admin/new-meanings", { newMeaningsData })
    //console.log(newMeaningsData,"@newMeaningsData")
})

module.exports = router