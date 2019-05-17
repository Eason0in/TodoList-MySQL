const express = require('express')
const route = express.Router()
const { authenticated } = require('../config/auth')
const db = require('../models')
const Todo = db.Todo

//載入新增頁面
route.get('/new', (req, res) => {
  res.render('new')
})

//新增頁面-點選新增
route.post('/new', (req, res) => {
  Todo.create({
    name: req.body.name,
    done: false
  }).then(todo => res.redirect('/'))
})

// //載入詳細資料頁面
// route.get("/detail/:id", authenticated, (req, res) => {
//   Practice.findOne(
//     { _id: req.params.id, userId: req.user._id },
//     (err, todo) => {
//       res.render("detail", { detail: todo });
//     }
//   );
// });

// //載入編輯頁面
// route.get("/edit/:id", authenticated, (req, res) => {
//   Practice.findOne(
//     { _id: req.params.id, userId: req.user._id },
//     (err, todo) => {
//       if (err) console.error(err);
//       res.render("edit", { edit: todo });
//     }
//   );
// });

// //儲存編輯頁面
// route.put("/edit/:id", authenticated, (req, res) => {
//   Practice.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
//     if (err) console.error(err);
//     res.redirect("/");
//   });

// });

// //刪除
// route.delete("/delete/:id", authenticated, (req, res) => {

//   // })
//   Practice.findByIdAndRemove(req.params.id, (err, todo) => {
//     if (err) console.error(err);
//     res.redirect("/");
//   });
// });

module.exports = route
