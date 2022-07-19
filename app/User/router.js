const router = require('express').Router()
const controller = require('./controller')

router.get('/login', controller.viewLogin)
router.post('/login', controller.signIn)
router.get('/logout', controller.signOut)

module.exports = router;
