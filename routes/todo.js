const express = require('express')
const router = express.Router()
const { authenticated } = require('../config/auth')
const db = require('../models')
const Todo = db.Todo
const User = db.User

//載入新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//新增頁面-點選新增
router.post('/new', (req, res) => {
  Todo.create({
    name: req.body.name,
    done: false
  }).then(todo => res.redirect('/'))
})

// //載入詳細資料頁面
// router.get("/detail/:id", authenticated, (req, res) => {
//   Practice.findOne(
//     { _id: req.params.id, userId: req.user._id },
//     (err, todo) => {
//       res.render("detail", { detail: todo });
//     }
//   );
// });

// //載入編輯頁面
// router.get("/edit/:id", authenticated, (req, res) => {
//   Practice.findOne(
//     { _id: req.params.id, userId: req.user._id },
//     (err, todo) => {
//       if (err) console.error(err);
//       res.render("edit", { edit: todo });
//     }
//   );
// });

// //儲存編輯頁面
// router.put("/edit/:id", authenticated, (req, res) => {
//   Practice.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
//     if (err) console.error(err);
//     res.redirect("/");
//   });

// });

// //刪除
// router.delete("/delete/:id", authenticated, (req, res) => {

//   // })
//   Practice.findByIdAndRemove(req.params.id, (err, todo) => {
//     if (err) console.error(err);
//     res.redirect("/");
//   });
// });

module.exports = router
