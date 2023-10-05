const userService = require("./user.service");

exports.getLogin = (req, res) => {
  res.render("login.html");
};

exports.getLogout = (req, res) => {
  res.clearCookie("token"); // 이것의 원리는 실제로 해당 쿠키를 지우는 것이 아니라, Max-Age = 0으로 줘버리는 것
  res.redirect("/");
};

exports.getInfo = async (req, res) => {
  console.log("getInfo : ", req.user);
  res.render("user/user.info.html", { user: req.user });
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
    next();
  }
};
