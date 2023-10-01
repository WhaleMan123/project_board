const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login.html");
});

router.post("/login", (req, res) => {
  res.redirect("/");
});

module.exports = router;
