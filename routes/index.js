const router = require('express').Router()

router.get('/', (req, res) => { res.redirect('/auth/login')})

module.exports = router;
