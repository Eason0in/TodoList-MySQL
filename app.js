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
// app.get("/", (req, res) => {
//   Todo.findAll().then(todos => {
//     res.render("index", { todos });
//   });
// });

app.listen(port, () => {
  db.sequelize.sync();
  console.log(`app is running http://localhost:${port}`);
});

app.use("/", require("./routes/home"));
// app.use("/todos", require("./routes/todo"));
app.use("/users", require("./routes/user"));
// app.use("/auth", require("./routes/auths"));
