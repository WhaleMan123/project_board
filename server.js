const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const router = require("./src/index");
const pool = require("./pool");
// const router = require("./src/index");

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(router);

// app.get("/", (req, res) => {
//   res.send("hi");
// });

// app.use(router);

app.listen(3000, async () => {
  console.log(`server start`);
  try {
    const connection = await pool.getConnection();
    console.log(`Connected to the database!`);
    connection.release();
  } catch (e) {
    console.log("DB Connection ERR", e.message);
  }
});
