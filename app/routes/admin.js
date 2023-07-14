const express = require("express");
const { adminVerfication } = require("../utils/authUtils");
const { getNewMeanings } = require("../controllers/adminController");
const { contributionOk, rejectContribution } = require("../controllers/wordController");
const router = express.Router();

// serve new-meanings page
router.get("/new-meanings", adminVerfication, async (req, res) => {
    const newMeaningsData = await getNewMeanings()
   // console.log(newMeaningsData)
    res.render("admin/new-meanings", { newMeaningsData })
    //console.log(newMeaningsData,"@newMeaningsData")
})

// contribution ok api 
router.post("/contribution-ok/:_id" , adminVerfication, async (req, res) => {
    contributionOk(req, res)
})

// reject contribution 
router.post("/reject/:_id/:key/:for_change/:user_id" , adminVerfication , (req, res) => {
    rejectContribution(req, res)
})

module.exports = router