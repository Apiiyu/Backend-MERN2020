const router = require('express').Router()
const controller = require('./controller')
const multer = require('multer')
const os = require('os')

router.get('/landing-page', controller.landingPage)
router.get('/detail/:id', controller.detailPage)
router.post('/booking', multer({ dest: os.tmpdir()}).single('proofPayment'), controller.booking)

module.exports = router