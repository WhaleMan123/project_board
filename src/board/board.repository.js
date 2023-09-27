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
        const sql = `select * from freeboards where id=${id}`;
        const [result] = await pool.query(sql);
        return result;
    } catch (e) {
        throw new Error(`DB 오류 ${e.message}`);
    }
};

exports.create = () => {};
