const express = require("express");
const { adminVerfication } = require("../utils/authUtils");
const { getChangesDetails, contributionOk, rejectContributionNewMeaning, rejectContributionEditMeaning } = require("../controllers/adminController");
const router = express.Router();

// serve new-meanings page
router.get("/new-meanings", adminVerfication, async (req, res) => {
    const newMeaningsData = await getChangesDetails("new_meaning")
    res.render("admin/new-meanings", { newMeaningsData })
})

// serve edit-meanings page
router.get("/edits", adminVerfication, async (req, res) => {
    const editMeaningsData = await getChangesDetails("edit")
    res.render("admin/edits", { editMeaningsData })
})

// reject contribution => new-meanings to exsting word 
router.post("/reject/new-meanings/:_id/:key/:for_change/:user_id/:ref" , adminVerfication , (req, res) => {
    rejectContributionNewMeaning(req, res)
})

// reject contribution => edit meanings in exsting word 
router.post("/reject/edit/:_id/:key/:for_change/:user_id/:old_meaning/:old_pos/:ref" , adminVerfication , (req, res) => {
    rejectContributionEditMeaning(req, res)
})

// contribution ok api 
router.post("/contribution-ok/:_id" , adminVerfication, async (req, res) => {
    contributionOk(req, res)
})

module.exports = router