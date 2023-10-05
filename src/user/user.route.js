const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.get("/login", userController.getLogin);
router.get("/logout", userController.getLogout);
router.get("/regist", userController.getRegist);
router.get("/info", userController.getInfo);
router.get("/modify", userController.getModify);

router.post("/login", userController.postLogin);
router.post("/regist", userController.postRegist);

module.exports = router;
