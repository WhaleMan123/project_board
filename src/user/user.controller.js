const moment = require("moment");
const userService = require("./user.service");

exports.getLogin = (req, res) => {
  res.render("login.html");
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
    console.log("Controller getInfo Error", error.message);
  }
};

exports.getModify = async (req, res) => {
  try {
    console.log(req.user);
    const user = req.user;
    user.birth = moment(user.birth).format("YYYY-MM-DD");
    user.registered_at = moment(user.registered_at).format("YYYY-MM-DD");
    res.render("user/user.modify.html", { user: user });
  } catch (error) {
    console.log("Controller getModify Error", error.message);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { user_email, user_password } = req.body;
    const result = await userService.postLogin(user_email, user_password);
    // console.log(result);

    if (result.isLogin) {
      // res.setHeader(
      //   "Set-Cookie",
      //   `token=${result.data}; Max-Age=3; domain=localhost; path=/; `
      // );
      // 위의 내용은 res.cookie는 이것과 동일한 의미
      res.cookie("token", result.data, {
        maxAge: 60 * 60 * 1000,
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
    // throw new Error("Controller Error " + error.message);
    next(error);
  }
};

exports.postRegist = async (req, res) => {
  try {
    // console.log(req.body);
    const regist_data = req.body;
    userService.postRegist(regist_data);

    // setTimeout(() => {
    //   res.redirect("/users/login");
    // }, 2500);
    res.render("user/user.regist.html", {
      SuccessMessage: `${regist_data.username}님 반갑습니다.회원가입에 성공하였습니다. 잠시 후 로그인 페이지로 이동합니다.`,
    });
  } catch (error) {
    console.log("Controller postRegist Error", error.message);
  }
};
