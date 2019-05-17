const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const app = express()
const port = 3000
const db = require('./models')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({ secret: 'ddd111', resave: 'false', saveUninitialized: 'false' }))
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.use('/', require('./routes/home'))
app.use('/todos', require('./routes/todo'))
app.use('/users', require('./routes/user'))

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`app is running http://localhost:${port}`)
})
