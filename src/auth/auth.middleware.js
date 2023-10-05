const JWT = require("../../lib/jwt");
const jwt = new JWT();
const userService = require("../user/user.service");

exports.auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return next();

    const payload = jwt.verify(token, "web7722");
    // console.log("payload : ", payload);

    const user = await userService.findOneByUserEmail(payload.email);
    // console.log("user : ", user);
    req.user = user;
    // 위와 같이 보통 로그인 한 사용자의 정보를 담을 때 req.user에다가 담는다.
    next();
  } catch (error) {
    console.log("auth.middleware error" + error.message);
    next(error);
  }
};

// 위에 같이 DB 요청을 하거나 하면, 대부분 async/awiat, try/catch를 써서 비동기로 처리해야 한다.
