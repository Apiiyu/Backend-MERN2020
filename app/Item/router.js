const router = require('express').Router()
const controller = require('./controller')
const os = require('os')
const multer = require('multer')

router.get('/', controller.viewItem)
router.get('/view/images/:id', controller.viewImages)
router.get('/update/:id', controller.viewUpdate)
router.post('/create', multer({dest: os.tmpdir()}).array('images'), controller.createData)
router.put('/update/:id', multer({dest: os.tmpdir()}).array('images'), controller.updateData)
router.delete('/delete/:id', controller.deleteData)

module.exports = router