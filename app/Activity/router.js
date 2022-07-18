const router = require('express').Router()
const controller = require('./controller')
const os = require('os')
const multer = require('multer')

router.get('/:id', controller.viewActivity)
router.post('/create', multer({dest: os.tmpdir()}).single('imageUrl'), controller.createData)
router.put('/update', multer({dest: os.tmpdir()}).single('imageUrl'), controller.updateData)
router.delete('/delete/:id', controller.deleteData)

module.exports = router