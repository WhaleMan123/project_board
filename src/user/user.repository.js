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

exports.registNewUser = async (regist_data) => {
  try {
    // console.log(regist_data);
    const { email, password, username, gender, birth } = regist_data;
    const sql = `INSERT INTO users (email, password, username, birth, gender) VALUES (?, ?, ?, ?, ?)`;
    const result = await pool.query(sql, [
      email,
      password,
      username,
      birth,
      gender,
    ]);
    console.log(
      `[email : ${email}, username : ${username}] 유저가 회원가입에 성공.`
    );
  } catch (error) {
    throw new Error("Repository registNewUser Error " + error.message);
  }
};

exports.modifyUserInfo = async (userEmail, modifyData) => {
  try {
    const { password, username, gender, birth } = modifyData;
    const sql = `UPDATE users SET password=?, username=?, gender=?, birth=? WHERE email=?`;
    await pool.query(sql, [password, username, gender, birth, userEmail]);
  } catch (error) {
    throw new Error("Repository modiftUserInfo Error : " + error.message);
  }
};

exports.deleteUserInfo = async (userEmail) => {
  try {
    const sql = `DELETE FROM users WHERE email=?`;
    await pool.query(sql, [userEmail]);
    console.log(`[email : ${userEmail}] 유저가 회원탈퇴 성공.`);
  } catch (error) {
    throw new Error("Repository deleteUserInfo Error : " + error.message);
  }
};
