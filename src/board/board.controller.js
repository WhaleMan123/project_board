// const boardService = require("./board.service");
const {
  FreeBoardService,
  AnnouncementBoardService,
} = require("./board.service");
const date = require("../../lib/date");
const { format } = require("../../pool");

const freeBoardService = new FreeBoardService();
const announcementBoardService = new AnnouncementBoardService();

exports.freeboardGetWrite = async (req, res) => {
  try {
    if (!req.user) {
      return res.send(
        `<script>alert("로그인이 필요합니다."); window.location.href="/users/login";</script>`
      );
    }
    const { username } = req.user;
    res.render("freeboard/write.html", { username });
  } catch (error) {
    console.log("Controller freeboardGetWrite ERROR : ", error.message);
    next(error);
  }
};

exports.announcementGetWrite = (req, res) => {
  const { username, level } = req.user;
  if (level < 2) {
    return res.status(403).send("권한이 없습니다.");
  } else {
    res.render("announcement/write.html", { username });
  }
};

exports.freeboardGetList = async (req, res, next) => {
  try {
    let user;
    if (req.user) {
      user = req.user;
    } else {
      user = null;
    }

    const result = await freeBoardService.getFindAll();
    const formattedResults = result.map((item) => {
      item.formattedDate = date.formatDate(item.created_at);
      return item;
    });

    res.render("freeboard/list.html", { list: formattedResults, user: user });
  } catch (e) {
    next(e);
  }
};

exports.announcementGetList = async (req, res, next) => {
  try {
    let level;
    let user;
    if (req.user && req.user.level) {
      level = req.user.level;
      user = req.user;
    } else {
      level = 0;
      user = null;
    }

    const result = await announcementBoardService.getFindAll();

    const formattedResults = result.map((item) => {
      item.formattedDate = date.formatDate(item.created_at);
      return item;
    });

    res.render("announcement/list.html", {
      list: formattedResults,
      level: level,
      user: user,
    });
  } catch (error) {
    console.log("Controller announcementGetList ERROR : ", error.message);
    next(error);
  }
};

exports.freeboardGetView = async (req, res, next) => {
  try {
    const [result] = await freeBoardService.getFindOne(req.query.id);
    result.formattedDate = date.formatDate(result.created_at);
    const comment = await freeBoardService.getFindComment(req.query.id);

    res.render("freeboard/view.html", { result: result, comment: comment });
  } catch (error) {
    console.log("Controller freeboardGetView ERROR : ", error.message);
    next(error);
  }
};

exports.announcementGetView = async (req, res, next) => {
  try {
    let level;
    if (req.user && req.user.level) {
      level = req.user.level;
    } else {
      level = 0;
    }
    const [result] = await announcementBoardService.getFindOne(req.query.id);
    result.formattedDate = date.formatDate(result.created_at);
    result.level = level;
    res.render("announcement/view.html", result);
  } catch (error) {
    console.log("Controller announcementGetView ERROR : ", error.message);
    next(error);
  }
};

exports.freeboardGetModify = async (req, res, next) => {
  try {
    let level;
    if (req.user && req.user.level) {
      level = req.user.level;
    } else {
      level = 0;
    }

    const [result] = await freeBoardService.getFindOneWithoutIncreamentHit(
      req.query.id
    );

    if (req.user && result.email === req.user.email) {
      // 로그인 하였고, 글 작성자 본인일 경우
      result.formattedDate = date.formatDate(result.created_at);
      res.render("freeboard/modify.html", result);
      return;
    } else if (req.user && level >= 2) {
      // 관리자일 경우
      result.formattedDate = date.formatDate(result.created_at);
      res.render("freeboard/modify.html", result);
      return;
    } else if (req.user && result.email !== req.user.email) {
      // 로그인 했지만, 글 작성자가 아닌 유저일 경우
      return res.send(
        `<script>alert("권한이 없습니다."); window.location.href="/boards/freeboard/list";</script>`
      );
    } else if (!req.user) {
      // 로그인을 안 한 상태일 경우
      return res.send(
        `<script>alert("로그인이 필요합니다."); window.location.href="/users/login";</script>`
      );
    } else {
      // 오류가 발생하였을 경우 최종 처리
      return res.send(
        `<script>alert("오류가 발생하였습니다."); window.location.href="/users/login";</script>`
      );
    }
  } catch (error) {
    console.log("Controller freeboardGetModify ERROR : ", error.message);
    next(error);
  }
};

exports.announcementGetModify = async (req, res, next) => {
  try {
    const [result] =
      await announcementBoardService.getFindOneWithoutIncreamentHit(
        req.query.id
      );
    result.formattedDate = date.formatDate(result.created_at);
    const level = req.user.level;
    //   console.log("Controller announcementGetModify : ", result);
    //   console.log("Controller announcementGetModify level : ", level);
    if (level < 2) {
      return res.status(403).send("권한이 없습니다.");
    } else {
      res.render("announcement/modify.html", result);
    }
  } catch (error) {
    console.log("Controller announcementGetModify ERROR : ", error.message);
    next(error);
  }
};

exports.freeboardPostWrite = async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    const result = await freeBoardService.write(req.body, userEmail);
    res.redirect(`/boards/freeboard/view?id=${result.id}`);
  } catch (e) {
    next(e);
  }
};

exports.announcementPostWrite = async (req, res, next) => {
  try {
    const result = await announcementBoardService.write(req.body);
    const level = req.user.level;
    if (level < 2) {
      return res.status(403).send("권한이 없습니다.");
    } else {
      res.redirect(`/boards/announcement/view?id=${result.id}`);
    }
  } catch (error) {
    console.log("Controller announcementPostWrite ERROR : ", error.message);
    next(error);
  }
};

exports.freeboardPostModify = async (req, res, next) => {
  try {
    let level;
    if (req.user && req.user.level) {
      level = req.user.level;
    } else {
      level = 0;
    }
    const id = req.body.id;
    const [result] = await freeBoardService.getFindOneWithoutIncreamentHit(id);

    if (req.user && result.email === req.user.email) {
      // 로그인 하였고, 글 작성자 본인일 경우
      await freeBoardService.modify(id, req.body);
      res.redirect(`/boards/freeboard/view?id=${id}`);
    } else if (req.user && level >= 2) {
      // 관리자일 경우
      await freeBoardService.modify(id, req.body);
      res.redirect(`/boards/freeboard/view?id=${id}`);
    } else {
      // 그 외의 경우, 권한이 없는 경우
      return res.send(
        `<script>alert("권한이 없습니다."); window.location.href="/boards/freeboard/list";</script>`
      );
    }
  } catch (error) {
    console.log("Controller freeboardPostModify ERROR : ", error.message);
    next(error);
  }
};

exports.announcementPostModify = async (req, res, next) => {
  try {
    const id = req.body.id;
    const level = req.user.level;
    if (level < 2) {
      return res.status(403).send("권한이 없습니다.");
    } else {
      await announcementBoardService.modify(id, req.body);
      res.redirect(`/boards/announcement/view?id=${id}`);
    }
  } catch (error) {
    console.log("Controller announcementPostModify ERROR : ", error.message);
    next(error);
  }
};

exports.freeboardPostDelete = async (req, res, next) => {
  try {
    const id = req.query.id;
    await freeBoardService.delete(id);
    res.redirect("/boards/freeboard/list");
  } catch (e) {
    next(e);
  }
};

exports.announcementPostDelete = async (req, res, next) => {
  try {
    const id = req.query.id;
    const level = req.user.level;
    if (level < 2) {
      return res.status(403).send("권한이 없습니다.");
    } else {
      await announcementBoardService.delete(id);
      res.redirect("/boards/announcement/list");
    }
  } catch (e) {
    console.log("boardController announcementPostDelete Error : ", e.message);
    next(e);
  }
};

exports.freeboardPostWriteComment = async (req, res) => {
  try {
    if (!req.user) {
      return res.send(
        `<script>alert("로그인이 필요합니다."); window.location.href="/users/login";</script>`
      );
    }
    // console.log("Contoroller freeboardWriteComment Query : ", req.query.id);
    // console.log("Contoroller freeboardWriteComment : ", req.user);
    // console.log("Contoroller freeboardWriteComment : ", req.body);
    await freeBoardService.writeComment(req.body, req.user, req.query.id);
    res.redirect(`/boards/freeboard/view?id=${req.query.id}`);
  } catch (error) {
    console.log("Controller freeboardWriteComment ERROR : ", error.message);
    next(error);
  }
};

// exports.freeboardAddComment = async (req, res) => {
//   try {

//   } catch (error) {
//     console.log("boardController freeboardAddComment Error : ", error.message);
//     next(error);
//   }
// };

//  ---- 나누기 전 이전 코드들

// exports.getList = async (req, res, next) => {
//     try {
//         const result = await boardService.getFindAll();
//         const formattedResults = result.map((item) => {
//             const date = new Date(item.created_at);
//             item.formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
//                 date.getDate()
//             ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(
//                 2,
//                 "0"
//             )}`;
//             return item;
//         });

//         res.render("board/list.html", { list: formattedResults });
//         // console.log(result);
//     } catch (e) {
//         next(e);
//     }
// };

// exports.getView = async (req, res, next) => {
//     try {
//         // console.log("ID 값:", req.query.id);
//         const [result] = await boardService.getFindOne(req.query.id);
//         const date = new Date(result.created_at);
//         result.formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
//             date.getDate()
//         ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

//         res.render("board/view.html", result);
//         // console.log(result);
//     } catch (e) {
//         next(e);
//     }
// };

// exports.getModify = async (req, res, next) => {
//     const [result] = await boardService.getFindOneWithoutIncreamentHit(req.query.id);
//     const date = new Date(result.created_at);
//     result.formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
//         date.getDate()
//     ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

//     res.render("board/modify.html", result);
// };

// exports.postWrite = async (req, res, next) => {
//     try {
//         const result = await boardService.write(req.body);
//         // console.log("게시글 작성 후 반환된 결과:", result);
//         res.redirect(`/boards/view?id=${result.id}`);
//     } catch (e) {
//         next(e);
//     }
// };

// exports.postModify = async (req, res, next) => {
//     try {
//         const id = req.query.id;
//         await boardService.modify(id, req.body);
//         res.redirect(`/boards/view?id=${id}`);
//     } catch (e) {
//         next(e);
//     }
// };

// exports.postDelete = async (req, res, next) => {
//     try {
//         const id = req.query.id;
//         await boardService.delete(id);
//         res.redirect("/boards/list");
//     } catch (e) {
//         next(e);
//     }
// };
