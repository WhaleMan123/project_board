const userRepository = require("./user.repository");
const JWT = require("../../lib/jwt");
const jwt = new JWT();

exports.findOneByUserEmail = async (user_email) => {
  try {
    const result = await userRepository.findOne("email", user_email);
    return result;
  } catch (error) {
    throw new Error("Service findOneByUser Error : " + error.message);
  }
};

exports.getDelete = async (userEmail) => {
  try {
    await userRepository.deleteUserInfo(userEmail);
  } catch (error) {
    throw new Error("Service getDelete Error : " + error.message);
  }
};

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
    throw new Error("Service postLogin Error : " + error.message);
  }
};

exports.postRegist = async (registData) => {
  try {
    // console.log("postRegist", registData);
    userRepository.registNewUser(registData);
  } catch (error) {
    throw new Error("Service postRegist Error : " + error.message);
  }
};

exports.postModify = async (userEmail, modifyData) => {
  try {
    await userRepository.modifyUserInfo(userEmail, modifyData);
  } catch (error) {
    throw new Error("Service postModify Error : " + error.message);
  }
};

exports.checkDuplicateEmail = async (userEmail) => {
  try {
    const result = await userRepository.findOne("email", userEmail);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Service checkDuplicateEmail Error : " + error.message);
  }
};
