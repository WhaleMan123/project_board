const express = require("express");
const router = express.Router();
const controller = require("./board.controller");

router.get("/freeboard/list", controller.freeboardGetList);
router.get("/freeboard/view", controller.freeboardGetView);
router.get("/freeboard/write", controller.freeboardGetWrite);
router.get("/freeboard/modify", controller.freeboardGetModify);
router.post("/freeboard/write", controller.freeboardPostWrite);
router.post("/freeboard/modify", controller.freeboardPostModify);
router.post("/freeboard/delete", controller.freeboardPostDelete);
router.post("/freeboard/writecomment", controller.freeboardPostWriteComment);

router.get("/announcement/list", controller.announcementGetList);
router.get("/announcement/view", controller.announcementGetView);
router.get("/announcement/write", controller.announcementGetWrite);
router.get("/announcement/modify", controller.announcementGetModify);
router.post("/announcement/write", controller.announcementPostWrite);
router.post("/announcement/modify", controller.announcementPostModify);
router.post("/announcement/delete", controller.announcementPostDelete);

module.exports = router;
