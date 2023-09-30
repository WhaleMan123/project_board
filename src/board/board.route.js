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

router.get("/announcement/list", controller.announcementGetList);
router.get("/announcement/view", controller.announcementGetView);
router.get("/announcement/write", controller.announcementGetWrite);
router.get("/announcement/modify", controller.announcementGetModify);
router.post("/announcement/write", controller.announcementPostWrite);
router.post("/announcement/modify", controller.announcementPostModify);
router.post("/announcement/delete", controller.announcementPostDelete);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const controller = require("./board.controller");

// router.get("/list", controller.getList);
// router.get("/view", controller.getView);
// router.get("/write", controller.getWrite);
// router.get("/modify", controller.getModify);

// router.post("/write", controller.postWrite);
// router.post("/modify", controller.postModify);
// router.post("/delete", controller.postDelete);

module.exports = router;
