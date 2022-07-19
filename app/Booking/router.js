const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.viewBooking)
router.get('/detail/:id', controller.viewDetail)
router.put('/update/status/:id', controller.changeStatus)

module.exports = router