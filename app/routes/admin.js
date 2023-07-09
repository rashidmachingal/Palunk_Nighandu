const express = require("express");
const { adminVerfication } = require("../utils/authUtils");
const router = express.Router();

router.get("/dashboard", adminVerfication, (req, res) => {
    res.render("admin/new-meanings")
})

module.exports = router