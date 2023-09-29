const pool = require("../../pool");

exports.findAll = async () => {
    try {
        const sql = "select * from freeboards";
        const [result] = await pool.query(sql);
        return result;
    } catch (e) {
        throw new Error(`DB 오류 발생 ${e.message}`);
    }
};

exports.findOne = async (id) => {
    try {
        const sql = "select * from freeboards where id=?";
        const [result] = await pool.query(sql, [id]);
        return result;
    } catch (e) {
        throw new Error(`DB 오류 발생 ${e.message}`);
    }
};

exports.incrementHit = async (id) => {
    try {
        const sql = "UPDATE freeboards SET hit = hit + 1 WHERE id=?";
        const result = await pool.query(sql, [id]);
        if (result.affectedRows === 0) {
            throw new Error(`ID ${id}에 해당하는 게시글이 없습니다.`);
        }
        return result;
    } catch (e) {
        throw new Error(`DB 오류 발생 ${e.message}`);
    }
};

exports.write = async (data) => {
    try {
        // const sql = `INSERT INTO freeboards(title, content, writer) values(${data.title}, ${data.content}, ${data.writer}`;
        const sql = "INSERT INTO freeboards(title, content, writer) values(?, ?, ?)";
        const [rows, fields] = await pool.query(sql, [data.title, data.content, data.writer]);
        // console.log("Repository 반환 값:", rows.insertId);
        return { id: rows.insertId };
    } catch (e) {
        throw new Error(`DB 오류 발생 ${e.message}`);
    }
};

exports.modify = async (id, data) => {
    try {
        const sql = "UPDATE freeboards SET title=?, content=?, writer=? WHERE id=?";
        const result = await pool.query(sql, [data.title, data.content, data.writer, id]);
        if (result.affectedRows === 0) {
            throw new Error(`ID ${id}에 해당하는 게시글이 없습니다.`);
        }
        return result;
    } catch (e) {
        throw new Error(`DB 오류 발생 ${e.message}`);
    }
};

exports.delete = async (id) => {
    try {
        const sql = "DELETE FROM freeboards WHERE id=?";
        const [result] = await pool.query(sql, [id]);
        if (result.affectedRows === 0) {
            throw new Error(`ID ${id}에 해당하는 게시글이 없습니다.`);
        }
        return result;
    } catch (e) {
        throw new Error(`DB 오류 발생 ${e.message}`);
    }
};
