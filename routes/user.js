const express = require("express");
const route = express.Router();
// const User = require("../models/user");

route.get("/login", (req, res) => {
  res.render("login");
});

// route.post("/login", (req, res, next) => {
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/users/login"
//   })(req, res, next);
// });

route.get("/register", (req, res) => {
  res.render("register");
});

// route.post("/register", (req, res) => {
//   const { name, email, password, password2 } = req.body;
//   const errors = [];
//   if (!name || !email || !password || !password2) {
//     errors.push({ message: "全部欄位為必填" });
//   }

//   if (password !== password2) {
//     errors.push({ message: "密碼不一致" });
//   }

//   if (errors.length > 0) {
//     res.render("register", { name, email, password, password2, errors });
//   } else {
//     Practice.findOne({ email }).then(user => {
//       if (user) {
//         errors.push({ message: "此email已經註冊過了" });
//         res.render("register", { name, email, password, password2 });
//       } else {
//         const newUser = new User({ name, email, password });

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             newUser.password = hash;
//             newUser
//               .save()
//               .then(user => {
//                 console.log(user); //then會把新增的資料接回來
//                 res.redirect("/");
//               })
//               .catch(err => console.log(err));
//           });
//         });
//       }
//     });
//   }
// });

// route.get("/logout", (req, res) => {
//   req.logOut();
//   req.flash("success_msg", "登出成功");
//   res.redirect("/users/login");
// });

module.exports = route;
