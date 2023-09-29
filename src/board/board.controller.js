const boardService = require("./board.service");

exports.getWrite = (req, res) => {
    res.render("board/write.html");
};

exports.getList = async (req, res, next) => {
    try {
        const result = await boardService.getFindAll();
        const formattedResults = result.map((item) => {
            const date = new Date(item.created_at);
            item.formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                date.getDate()
            ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(
                2,
                "0"
            )}`;
            return item;
        });

        res.render("board/list.html", { list: formattedResults });
        // console.log(result);
    } catch (e) {
        next(e);
    }
};

exports.getView = async (req, res, next) => {
    try {
        // console.log("ID 값:", req.query.id);
        const [result] = await boardService.getFindOne(req.query.id);
        const date = new Date(result.created_at);
        result.formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
            date.getDate()
        ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

        res.render("board/view.html", result);
        // console.log(result);
    } catch (e) {
        next(e);
    }
};

exports.getModify = async (req, res, next) => {
    const [result] = await boardService.getFindOneWithoutIncreamentHit(req.query.id);
    const date = new Date(result.created_at);
    result.formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
        date.getDate()
    ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

    res.render("board/modify.html", result);
};

exports.postWrite = async (req, res, next) => {
    try {
        const result = await boardService.write(req.body);
        // console.log("게시글 작성 후 반환된 결과:", result);
        res.redirect(`/boards/view?id=${result.id}`);
    } catch (e) {
        next(e);
    }
};

exports.postModify = async (req, res, next) => {
    try {
        const id = req.query.id;
        await boardService.modify(id, req.body);
        res.redirect(`/boards/view?id=${id}`);
    } catch (e) {
        next(e);
    }
};

exports.postDelete = async (req, res, next) => {
    try {
        const id = req.query.id;
        await boardService.delete(id);
        res.redirect("/boards/list");
    } catch (e) {}
};
