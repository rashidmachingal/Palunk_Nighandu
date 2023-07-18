const express = require("express");
const { adminVerfication } = require("../utils/authUtils");
const { getNewMeanings, contributionOk, rejectContributionNewMeaning } = require("../controllers/adminController");
const router = express.Router();

// serve new-meanings page
router.get("/new-meanings", adminVerfication, async (req, res) => {
    const newMeaningsData = await getNewMeanings()
    res.render("admin/new-meanings", { newMeaningsData })
})

// reject contribution => new-meanings to exsting word 
router.post("/reject/:_id/:key/:for_change/:user_id" , adminVerfication , (req, res) => {
    rejectContributionNewMeaning(req, res)
})

// contribution ok api 
router.post("/contribution-ok/:_id" , adminVerfication, async (req, res) => {
    contributionOk(req, res)
})

module.exports = router