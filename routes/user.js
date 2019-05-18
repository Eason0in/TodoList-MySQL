const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      req.flash('warning_msg', info.message)
      return res.redirect('/users/login')
    }
    req.logIn(user, err => {
      if (err) {
        return next(err)
      }
      return res.redirect('/')
    })
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  const errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位為必填' })
  }

  if (password !== password2) {
    errors.push({ message: '密碼不一致' })
  }

  if (errors.length > 0) {
    return res.render('register', { name, email, password, password2, errors })
  } else {
    User.findOne({ where: { email } }).then(user => {
      if (user) {
        console.log('User already exists')
        res.render('register', { name, email, password, password2 })
      } else {
        const newUser = new User({ name, email, password })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash
            newUser
              .save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => console.log(err))
          })
        })
      }
    })
  }
})

router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', '登出成功')
  res.redirect('/users/login')
})

module.exports = router
