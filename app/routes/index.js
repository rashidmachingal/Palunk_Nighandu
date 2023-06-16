const express = require("express");
const { getWordMeaning } = require("../controllers/wordController");
const router = express.Router();

// serve home page
router.get("/", (req, res) => {
    res.render("pages/index")
})

// render result page
router.get("/english-malayalam/:word", async (req, res) => {
    const data = await getWordMeaning(req.params.word)
    res.render("pages/result", data)
})

module.exports = router