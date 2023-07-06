const express = require("express");
const { getWordMeaning, addNewWord, addMeaningToWord, editWordMeaning } = require("../controllers/wordController");
const { authVerfication, getUser } = require("../utils/authUtils");
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

// add new word to database api
router.post("/add-new-word", (req, res) => {
    addNewWord(req, res)
})

// add a new meaning to and existing word api
router.post("/add-new-meaning/:english_word" , async (req, res) => {
    try{
        const userInfo = await getUser(req)
        addMeaningToWord(req, res, userInfo)
    }catch (userInfo) {
        addMeaningToWord(req, res, userInfo)
    }
})

// edit word meaning api
router.post("/edit-word-meaning/:wordId", (req, res) => {
    editWordMeaning(req, res)
})

module.exports = router