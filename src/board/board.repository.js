const pool = require("../../pool");

class BoardRepository {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async findAll() {
        try {
            const sql = `select * from ${this.tableName}`;
            const [result] = await pool.query(sql);
            return result;
        } catch (e) {
            throw new Error(`DB 오류 발생 ${e.message}`);
        }
    }

    async findOne(id) {
        try {
            const sql = `select * from ${this.tableName} where id=?`;
            const [result] = await pool.query(sql, [id]);
            return result;
        } catch (e) {
            throw new Error(`DB 오류 발생 ${e.message}`);
        }
    }

    async incrementHit(id) {
        try {
            const sql = `update ${this.tableName} set hit = hit + 1 where id=?`;
            const result = await pool.query(sql, [id]);
            if (result.affectedRows === 0) {
                throw new Error(`ID ${id}에 해당하는 게시글이 없음`);
            }
        } catch (e) {
            throw new Error(`DB 오류 발생 ${e.message}`);
        }
    }

    async write(data) {
        try {
            const sql = `insert into ${this.tableName}(title, content, writer) values(?, ?, ?)`;
            const [rows, fields] = await pool.query(sql, [data.title, data.content, data.writer]);
            return { id: rows.insertId };
        } catch (e) {
            throw new Error(`DB 오류 발생 ${e.message}`);
        }
    }

    async modify(id, data) {
        try {
            const sql = `UPDATE ${this.tableName} SET title=?, content=?, writer=? WHERE id=?`;
            const [result] = await pool.query(sql, [data.title, data.content, data.writer, id]);
            if (result.affectedRows === 0) {
                throw new Error(`ID ${id}에 해당하는 게시글이 없습니다.`);
            }
            return result;
        } catch (e) {
            throw new Error(`DB 오류 발생 ${e.message}`);
        }
    }

    async delete(id) {
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE id=?`;
            const [result] = await pool.query(sql, [id]);
            if (result.affectedRows === 0) {
                throw new Error(`ID ${id}에 해당하는 게시글이 없습니다.`);
            }
            return result;
        } catch (e) {
            throw new Error(`DB 오류 발생 ${e.message}`);
        }
    }
}

class FreeBoardRepository extends BoardRepository {
    constructor() {
        super("freeboards");
    }

    // 필요한 경우 FreeBoard만의 특별한 메서드나 로직 추가할 것
}

class AnnouncementBoardRepository extends BoardRepository {
    constructor() {
        super("announcements");
    }
}

module.exports = {
    FreeBoardRepository,
    AnnouncementBoardRepository,
};

// --------------------------------------------- 클래스화 전에 쓰는 코드들 정리

// exports.findAll = async () => {
//     try {
//         const sql = "select * from freeboards";
//         const [result] = await pool.query(sql);
//         return result;
//     } catch (e) {
//         throw new Error(`DB 오류 발생 ${e.message}`);
//     }
// };

// exports.findOne = async (id) => {
//     try {
//         const sql = "select * from freeboards where id=?";
//         const [result] = await pool.query(sql, [id]);
//         return result;
//     } catch (e) {
//         throw new Error(`DB 오류 발생 ${e.message}`);
//     }
// };

// exports.incrementHit = async (id) => {
//     try {
//         const sql = "UPDATE freeboards SET hit = hit + 1 WHERE id=?";
//         const result = await pool.query(sql, [id]);
//         if (result.affectedRows === 0) {
//             throw new Error(`ID ${id}에 해당하는 게시글이 없습니다.`);
//         }
//         return result;
//     } catch (e) {
//         throw new Error(`DB 오류 발생 ${e.message}`);
//     }
// };

// exports.write = async (data) => {
//     try {
//         // const sql = `INSERT INTO freeboards(title, content, writer) values(${data.title}, ${data.content}, ${data.writer}`;
//         const sql = "INSERT INTO freeboards(title, content, writer) values(?, ?, ?)";
//         const [rows, fields] = await pool.query(sql, [data.title, data.content, data.writer]);
//         // console.log("Repository 반환 값:", rows.insertId);
//         return { id: rows.insertId };
//     } catch (e) {
//         throw new Error(`DB 오류 발생 ${e.message}`);
//     }
// };

// exports.modify = async (id, data) => {
//     try {
//         const sql = "UPDATE freeboards SET title=?, content=?, writer=? WHERE id=?";
//         const result = await pool.query(sql, [data.title, data.content, data.writer, id]);
//         if (result.affectedRows === 0) {
//             throw new Error(`ID ${id}에 해당하는 게시글이 없습니다.`);
//         }
//         return result;
//     } catch (e) {
//         throw new Error(`DB 오류 발생 ${e.message}`);
//     }
// };

// exports.delete = async (id) => {
//     try {
//         const sql = "DELETE FROM freeboards WHERE id=?";
//         const [result] = await pool.query(sql, [id]);
//         if (result.affectedRows === 0) {
//             throw new Error(`ID ${id}에 해당하는 게시글이 없습니다.`);
//         }
//         return result;
//     } catch (e) {
//         throw new Error(`DB 오류 발생 ${e.message}`);
//     }
// };
