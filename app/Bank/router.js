const router = require('express').Router()
const controller = require('./controller')
const multer = require('multer')
const os = require('os')

router.get('/', controller.viewBank)
router.post('/create', multer({dest: os.tmpdir()}).single('imageUrl'), controller.createData)
router.put('/update', multer({dest: os.tmpdir()}).single('imageUrl'), controller.updateData)
router.delete('/delete/:id', controller.deleteData)

module.exports = router