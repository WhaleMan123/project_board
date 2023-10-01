const userService = require("./user.service");

exports.getLogin = (req, res) => {
  res.render("login.html");
};
exports.postLogin = (req, res) => {
  const result = userService.postLogin();
  console.log(result);
  res.redirect("/");
};
