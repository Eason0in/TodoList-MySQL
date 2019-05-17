const express = require('express')
const router = express.Router()
const { authenticated } = require('../config/auth')
const db = require('../models')
const Todo = db.Todo
const User = db.User

//載入新增頁面
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

//新增頁面-點選新增
router.post('/new', authenticated, (req, res) => {
  Todo.create({
    name: req.body.name,
    done: false,
    userId: req.user.id
  })
    .then(todo => res.redirect('/'))
    .catch(err => {
      return res.status(422).json(err)
    })
})

//載入詳細資料頁面
router.get('/detail/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        return res.error()
      }

      Todo.findOne({ where: { userId: req.user.id, id: req.params.id } }).then(todo => {
        res.render('detail', { detail: todo })
      })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

//載入編輯頁面
router.get('/edit/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id).then(user => {
    if (!user) {
      return res.error()
    }
    Todo.findOne({ where: { id: req.params.id, userId: req.user.id } }).then(todo => {
      res.render('edit', { edit: todo })
    })
  })
})

//儲存編輯頁面
router.put('/edit/:id', authenticated, (req, res) => {
  Todo.findOne({ where: { id: req.params.id, userId: req.user.id } }).then(todo => {
    todo.name = req.body.name
    if (req.body.done === 'on') {
      todo.done = true
    } else {
      todo.done = false
    }
    todo
      .save()
      .then(todo => {
        return res.redirect(`/todos/detail/${req.params.id}`)
      })
      .catch(err => {
        return res.status(422).json(err)
      })
  })
})

//刪除
router.delete('/delete/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        return res.error()
      }
      Todo.destroy({
        where: {
          userId: req.user.id,
          Id: req.params.id
        }
      }).then(todo => {
        return res.redirect('/')
      })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

module.exports = router
