const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email'
      },
      (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
          if (err) {
            return done(err)
          }
          if (!user) {
            return done(null, false, { message: 'That email is not registered' })
          }
          bcrypt.compare(password, user.password, (err, isMac) => {
            if (err) throw err
            if (isMac) {
              return done(null, user)
            } else {
              return done(null, false, { message: 'Email or Password incorrect' })
            }
          })
        })
      }
    )
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: '1551845641612313',
        clientSecret: '2e046d0b5ec4170aa4d3ee0d80b06b4e',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ['displayName', 'email']
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ email: profile._json.email }).then(user => {
          if (!user) {
            let password = Math.random()
              .toString(36)
              .slice(-8)
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(password, salt, (err, hash) => {
                const newUser = new User({
                  email: profile._json.email,
                  name: profile._json.name,
                  password: hash
                })

                newUser
                  .save()
                  .then(user => {
                    return done(null, user)
                  })
                  .catch(err => {
                    console.log(err)
                  })
              })
            })
          } else {
            return done(null, user)
          }
        })
        // User.findOrCreate({ email: profile.email }, (err, user) => {
        //   return done(err, user)
        // })
      }
    )
  )

  //為了要支援session的功能需要有序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}
