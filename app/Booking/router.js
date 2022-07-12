const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.viewBooking)

module.exports = router