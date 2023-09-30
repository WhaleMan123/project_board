// const boardService = require("./board.service");
const { FreeBoardService, AnnouncementBoardService } = require("./board.service");
const date = require("../../lib/date");

const freeBoardService = new FreeBoardService();
const announcementBoardService = new AnnouncementBoardService();

exports.freeboardGetWrite = (req, res) => {
    res.render("freeboard/write.html");
};

exports.announcementGetWrite = (req, res) => {
    res.render("announcement/write.html");
};

exports.freeboardGetList = async (req, res, next) => {
    try {
        const result = await freeBoardService.getFindAll();
        const formattedResults = result.map((item) => {
            item.formattedDate = date.formatDate(item.created_at);
            return item;
        });

        res.render("freeboard/list.html", { list: formattedResults });
        // console.log(result);
    } catch (e) {
        next(e);
    }
};

exports.announcementGetList = async (req, res, next) => {
    try {
        const result = await announcementBoardService.getFindAll();
        const formattedResults = result.map((item) => {
            item.formattedDate = date.formatDate(item.created_at);
            return item;
        });

        res.render("announcement/list.html", { list: formattedResults });
        // console.log(result);
    } catch (e) {
        next(e);
    }
};

exports.freeboardGetView = async (req, res, next) => {
    try {
        // console.log("ID 값:", req.query.id);
        const [result] = await freeBoardService.getFindOne(req.query.id);
        result.formattedDate = date.formatDate(result.created_at);

        res.render("freeboard/view.html", result);
        // console.log(result);
    } catch (e) {
        next(e);
    }
};

exports.announcementGetView = async (req, res, next) => {
    try {
        // console.log("ID 값:", req.query.id);
        const [result] = await announcementBoardService.getFindOne(req.query.id);
        result.formattedDate = date.formatDate(result.created_at);

        res.render("announcement/view.html", result);
        // console.log(result);
    } catch (e) {
        next(e);
    }
};

exports.freeboardGetModify = async (req, res, next) => {
    const [result] = await freeBoardService.getFindOneWithoutIncreamentHit(req.query.id);
    result.formattedDate = date.formatDate(result.created_at);

    res.render("freeboard/modify.html", result);
};

exports.announcementGetModify = async (req, res, next) => {
    const [result] = await announcementBoardService.getFindOneWithoutIncreamentHit(req.query.id);
    result.formattedDate = date.formatDate(result.created_at);

    res.render("announcement/modify.html", result);
};

exports.freeboardPostWrite = async (req, res, next) => {
    try {
        const result = await freeBoardService.write(req.body);
        // console.log("게시글 작성 후 반환된 결과:", result);
        res.redirect(`/boards/freeboard/view?id=${result.id}`);
    } catch (e) {
        next(e);
    }
};

exports.announcementPostWrite = async (req, res, next) => {
    try {
        const result = await announcementBoardService.write(req.body);
        // console.log("게시글 작성 후 반환된 결과:", result);
        res.redirect(`/boards/announcement/view?id=${result.id}`);
    } catch (e) {
        next(e);
    }
};

exports.freeboardPostModify = async (req, res, next) => {
    try {
        const id = req.query.id;
        await freeBoardService.modify(id, req.body);
        res.redirect(`/boards/freeboard/view?id=${id}`);
    } catch (e) {
        next(e);
    }
};

exports.announcementPostModify = async (req, res, next) => {
    try {
        const id = req.query.id;
        await announcementBoardService.modify(id, req.body);
        res.redirect(`/boards/announcement/view?id=${id}`);
    } catch (e) {
        next(e);
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
        await announcementBoardService.delete(id);
        res.redirect("/boards/announcement/list");
    } catch (e) {
        next(e);
    }
};

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
