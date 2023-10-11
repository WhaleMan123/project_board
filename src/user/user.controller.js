const moment = require("moment");
const userService = require("./user.service");

exports.getLogin = async (req, res) => {
  try {
    let user;
    if (req.user) {
      user = req.user;
      console.log({ user: user });
      res.render("login.html", { user: user });
    } else {
      res.render("login.html");
    }
  } catch (error) {
    console.log("Controller getLogin Error : ", error.message);
    next(error);
  }
};

exports.getLogout = (req, res) => {
  res.clearCookie("token"); // 이것의 원리는 실제로 해당 쿠키를 지우는 것이 아니라, Max-Age = 0으로 줘버리는 것
  res.redirect("/");
};

exports.getRegist = (req, res) => {
  res.clearCookie("token");
  res.render("user/user.regist.html");
};

exports.getInfo = async (req, res) => {
  try {
    // console.log("getInfo : ", req.user);
    const user = req.user;
    user.birth = moment(user.birth).format("YYYY-MM-DD");
    user.registered_at = moment(user.registered_at).format("YYYY-MM-DD");
    res.render("user/user.info.html", { user: user });
  } catch (error) {
    console.log("Controller getInfo Error : ", error.message);
    next(error);
  }
};

exports.getModify = async (req, res) => {
  try {
    // console.log("Controller getModify : ", req.user);
    const user = req.user;
    user.birth = moment(user.birth).format("YYYY-MM-DD");
    user.registered_at = moment(user.registered_at).format("YYYY-MM-DD");
    res.render("user/user.modify.html", { user: user });
  } catch (error) {
    console.log("Controller getModify Error : ", error.message);
  }
};

exports.getDelete = async (req, res) => {
  try {
    const userEmail = req.user.email;
    await userService.getDelete(userEmail);
    res.clearCookie("token");
    res.redirect("/");
  } catch (error) {
    console.log("Controller getDelete Error : ", error.message);
  }
};

exports.checkEmail = async (req, res) => {
  const email = req.query.email;
  try {
    const result = await userService.checkDuplicateEmail(email);
    res.json({ isDuplicate: result });
  } catch (error) {
    console.log("Controller checkEmail Error : ", error.message);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { user_email, user_password } = req.body;
    const result = await userService.postLogin(user_email, user_password);

    if (result.isLogin) {
      res.cookie("token", result.data, {
        maxAge: 60 * 60 * 1000, // cookie에서 maxAge 옵션은 ms 기준이다.(1000ms는 1초)
        domain: "localhost",
        path: "/",
      });
      return res.redirect("/");
    } else {
      return res.render("login.html", {
        errorMessage: "이메일 혹은 비밀번호가 올바르지 않습니다.",
      });
    }
  } catch (error) {
    throw new Error("Controller postLogin Error : " + error.message);
    next(error);
  }
};

exports.postRegist = async (req, res) => {
  try {
    // console.log("Controller req.body : ", req.body);

    const registData = req.body;
    await userService.postRegist(registData);
    res.render("user/user.regist.html", {
      SuccessMessage: `${registData.username}님 반갑습니다.회원가입에 성공하였습니다. 잠시 후 로그인 페이지로 이동합니다.`,
    });
  } catch (error) {
    console.log("Controller postRegist Error : ", error.message);
  }
};

exports.postModify = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const modifyData = req.body;
    const { username } = req.body;
    await userService.postModify(userEmail, modifyData);
    res.render("user/user.modify.html", {
      SuccessMessage: `${username}님 회원정보 수정이 완료됐습니다. 잠시 후 메인 페이지로 이동합니다.`,
    });
  } catch (error) {
    console.log("Controller postModify Error : ", error.message);
  }
};
