// const boardService = require("./board.service");
const { FreeBoardService, AnnouncementBoardService } = require("./board.service");
const date = require("../../lib/date");
const { format } = require("../../pool");

const freeBoardService = new FreeBoardService();
const announcementBoardService = new AnnouncementBoardService();

exports.freeboardGetWrite = async (req, res) => {
    try {
        if (!req.user) {
            return res.send(`<script>alert("로그인이 필요합니다."); window.location.href="/users/login";</script>`);
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
    } catch (error) {
        console.log("Controller freeboardGetList ERROR : ", error.message);
        next(error);
    }
};

exports.getFreeBoardList = async () => {
    let list = [];
    try {
        const result = await freeBoardService.getFindAll();
        list = result.map((item) => {
            item.formattedDate = date.formatDate(item.created_at);
            return item;
        });
    } catch (e) {
        console.error(e);
    }
    return list;
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

exports.getAnnouncementList = async () => {
    let list = [];
    try {
        const result = await announcementBoardService.getFindAll();
        list = result.map((item) => {
            item.formattedDate = date.formatDate(item.created_at);
            return item;
        });
    } catch (e) {
        console.error(e);
    }
    return list;
};

exports.freeboardGetView = async (req, res, next) => {
    try {
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
    const [result] = await freeBoardService.getFindOneWithoutIncreamentHit(req.query.id);
    result.formattedDate = date.formatDate(result.created_at);

    res.render("freeboard/modify.html", result);
};

exports.announcementGetModify = async (req, res, next) => {
    try {
        const [result] = await announcementBoardService.getFindOneWithoutIncreamentHit(req.query.id);
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
        const id = req.body.id;
        await freeBoardService.modify(id, req.body);
        res.redirect(`/boards/freeboard/view?id=${id}`);
    } catch (e) {
        next(e);
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
