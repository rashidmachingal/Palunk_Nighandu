const express = require("express");
const { getWordMeaning } = require("../controllers/wordController");
const router = express.Router();

// serve home page
router.get("/", (req, res) => {
    res.render("pages/index")
})

// render result page
router.get("/english-malayalam/:word", async (req, res) => {
    const english_word = req.params.word.replace(/-/g, " ");
    const data = await getWordMeaning(english_word)
    res.render("pages/result", data)
})

// serve add new word page
router.get("/add-new-word", async (req, res) => {
    res.render("pages/add-new-word")
})

module.exports = router