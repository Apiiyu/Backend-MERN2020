const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.viewCategory)
router.post('/create', controller.createData)
router.put('/update', controller.updateData)
router.delete('/delete/:id', controller.deleteData)

module.exports = router