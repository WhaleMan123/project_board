const pool = require("../../pool");

exports.findOneByUserInfo = async (user_email, user_password) => {
  // const sql = `SELECT * FROM users WHERE email="${user_email}" and password=${user_password}`;
  // 위처럼 쓰지 않고 sql injection 등의 보안 취약점을 방지하기 위하여 prepared statement 방식으로 써야한다.
  // --> async 함수는 이렇게 try, catch 구문으로 감싸서 에러처리를 반드시 해줘라
  try {
    const sql = `SELECT * FROM users WHERE email=? and password=?`;
    const [[result]] = await pool.query(sql, [user_email, user_password]);
    // console.log(result);
    return result;
  } catch (error) {
    throw new Error("Repository Error " + error.message);
  }
};

exports.findOne = async (field, value) => {
  try {
    const sql = `SELECT * FROM users WHERE ${field}=?`;
    const [[result]] = await pool.query(sql, [value]);
    return result;
  } catch (error) {
    throw new Error("Repository findOne Error" + error.message);
  }
};
