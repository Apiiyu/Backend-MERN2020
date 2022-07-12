const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.viewDashboard)

module.exports = router