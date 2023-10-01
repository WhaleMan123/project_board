const userRepository = require("./user.repository");

exports.postLogin = () => {
  const result = userRepository.findOneByUserInfo("web7722", "1234");
  return result;
};
