exports.auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token);
  } catch (error) {
    console.log("auth.middleware error" + e.message);
  }
  next();
};

// 위에 같이 DB 요청을 하거나 하면, 대부분 async/awiat, try/catch를 써서 비동기로 처리해야 한다.
