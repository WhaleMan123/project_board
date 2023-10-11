const express = require("express");
const router = express.Router();
const boardRouter = require("./board/board.route");
const userRouter = require("./user/user.route");
const boardController = require("./board/board.controller");

// router.get("/", async (req, res) => {
//     try {
//         const boardList = await boardController.getFreeBoardList();
//         res.render("index.html", { user: req.user, list: boardList });
//     } catch (e) {
//         console.error(e);
//         res.status(500).send("index.js쪽에서 freeboard 데이터 받아오는 데 에러남");
//     }
// });

router.get("/", async (req, res) => {
  try {
    const [freeBoardList, announcementList] = await Promise.all([
      boardController.getFreeBoardList(),
      boardController.getAnnouncementList(),
    ]);

    res.render("index.html", {
      user: req.user,
      freeList: freeBoardList,
      announcementList: announcementList,
    });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send("index.js에서 데이터를 받아오는 데 에러가 발생했습니다.");
  }
});

router.use("/boards", boardRouter);
router.use("/users", userRouter);

module.exports = router;
