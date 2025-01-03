const express = require("express");
const { getWordMeaning, addNewWord, addMeaningToWord, editWordMeaning } = require("../controllers/wordController");
const { getUser } = require("../utils/authUtils");
const router = express.Router();
const path = require('path');
const fs = require("fs"); 

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

// get results in json format
router.get("/json/english-malayalam/:word", async (req, res) => {
    const english_word = req.params.word.replace(/-/g, " ");
    const data = await getWordMeaning(english_word)
    res.json(data)
})

// serve add new word page
router.get("/add-new-word", async (req, res) => {
    res.render("pages/add-new-word")
})

// add new word to database api
router.post("/add-new-word", async (req, res) => {
    try{
        const userInfo = await getUser(req)
        addNewWord(req, res, userInfo)
    }catch (userInfo) {
        addNewWord(req, res, userInfo)
    }
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
router.post("/edit-word-meaning/:wordId", async (req, res) => {
    const userInfo = await getUser(req)
    try{
        editWordMeaning(req, res, userInfo)
    }catch (error) {
        console.log(error,"@error")
    }
  });

// serve about page
router.get("/what-is-palunk-nighandu", (req, res) => {
    res.render("pages/what-is-palunk-nighandu")
})

// serve contact page
router.get("/contact", (req, res) => {
    res.render("pages/contact")
}) 

// set firebase config keys
router.get("/firebase-config", (req, res) => {
    
    const firebaseConfig = {
        apiKey: process.env.apiKey,
        authDomain: process.env.apiKey,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
        measurementId: process.env.measurementId
    }

    res.json(firebaseConfig)
})

// server sitemap index
router.get('/sitemap-index.xml', function(req, res) {
    const filePath = path.join(__dirname, '..', '..', 'sitemap-index.xml');
    res.sendFile(filePath);
});

// Dynamic sitemap route
router.get('/sitemap-:index.xml', function(req, res) {
    const sitemapIndex = req.params.index; // Get the sitemap index from the URL parameter
    const filePath = path.join(__dirname, '..', '..', 'sitemaps', `sitemap-${sitemapIndex}.xml`);
    
    // Check if the file exists before sending it
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        // Return a 404 Not Found response if the file doesn't exist
        res.status(404).send('Sitemap not found');
    }
});

// serve robots
router.get('/robots.txt', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'robots.txt');
    res.sendFile(filePath);
})

// serve ads.txt
router.get('/ads.txt', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'ads.txt');
    res.sendFile(filePath);
})
module.exports = router