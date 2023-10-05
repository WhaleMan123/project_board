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
    });
    return { isLogin: true, data: token };
  } catch (error) {
    throw new Error("Service Error " + error.message);
  }
};

exports.findOneByUserEmail = async (user_email) => {
  try {
    const result = await userRepository.findOne("email", user_email);
    return result;
  } catch (error) {
    throw new Error("Service findOneByUser Error" + error.message);
  }
};
