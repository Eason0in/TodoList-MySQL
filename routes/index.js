const express = require('express')
const router = express.Router()

router.use('/', require('./home'))
router.use('/todos', require('./todo'))
router.use('/users', require('./user'))

module.exports = router
