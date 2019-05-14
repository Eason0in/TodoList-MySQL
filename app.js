const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const port = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const db = require("./models");
const Todo = db.Todo;
const User = db.User;

// 首頁
app.get("/", (req, res) => {
  res.send("hello world");
});
// 登入頁面
app.get("/users/login", (req, res) => {
  res.render("login");
});
// 登入檢查
app.post("/users/login", (req, res) => {
  res.send("login");
});
// 註冊頁面
app.get("/users/register", (req, res) => {
  res.render("register");
});
// 註冊檢查
app.post("/users/register", (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(user => res.redirect("/"));
});
// 登出
app.get("/users/logout", (req, res) => {
  res.send("logout");
});
app.listen(port, () => {
  db.sequelize.sync();
  console.log(`app is running http://localhost:${port}`);
});

// app.use("/", require("./routes/home"));
// app.use("/todos", require("./routes/todo"));
// app.use("/users", require("./routes/user"));
// app.use("/auth", require("./routes/auths"));
