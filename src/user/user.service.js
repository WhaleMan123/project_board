const userRepository = require("./user.repository");
const JWT = require("../../lib/jwt");
const jwt = new JWT();

exports.postLogin = async (user_email, user_password) => {
  try {
    const result = await userRepository.findOneByUserInfo(
      user_email,
      user_password
    );
    if (!result) {
      return { isLogin: false, data: null };
    }
    const token = jwt.sign({
      email: result.email,
      pw: result.password,
    });
    console.log(result);
    return { isLogin: true, data: token };
  } catch (error) {
    throw new Error("Service Error " + error.message);
  }
};
