const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.viewItem)

module.exports = router