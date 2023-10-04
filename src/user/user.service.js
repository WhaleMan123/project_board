const userRepository = require("./user.repository");

exports.postLogin = async () => {
  try {
    const result = await userRepository.findOneByUserInfo(
      "web7722@gmail.com",
      "1234"
    );
    return result;
  } catch (error) {
    throw new Error("Service Error " + error.message);
  }
};
