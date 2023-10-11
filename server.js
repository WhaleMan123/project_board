const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const router = require("./src/index");
const pool = require("./pool");
const cookieParser = require("cookie-parser");
const middleware = require("./src/auth/auth.middleware");
require("dotenv").config();
const env = nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

app.set("view engine", "html");
// nunjucks.configure("views", {
//   express: app,
//   autoescape: true,
// });
env.addFilter("slice", function (arr, start, end) {
    return arr.slice(start, end);
});

app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.auth);

app.use(router);
app.use((err, req, res, next) => {
    console.log(err);
    console.error(err.stack);
    res.status(500).send(err.message);
});

app.listen(process.env.PORT, async () => {
    console.log(`server start`);
    try {
        const connection = await pool.getConnection();
        console.log(`Connected to the database!`);
        connection.release();
    } catch (error) {
        console.log("DB Connection Error", error.message);
    }
});
