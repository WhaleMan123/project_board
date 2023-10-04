const userService = require("./user.service");

exports.getLogin = (req, res) => {
  res.render("login.html");
};
exports.postLogin = async (req, res, next) => {
  try {
    const result = await userService.postLogin();
    console.log(result);
    res.redirect("/");
  } catch (error) {
    // throw new Error("Controller Error " + error.message);
    next();
  }
};
