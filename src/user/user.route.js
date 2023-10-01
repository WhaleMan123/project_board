const express = require("express");
const router = express.Router();
const userCotroller = require("./user.controller");

router.get("/login", userCotroller.getLogin);
router.post("/login", userCotroller.postLogin);

module.exports = router;
