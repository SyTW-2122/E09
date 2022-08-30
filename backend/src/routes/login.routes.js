const { Router } = require('express');
const router = Router()

const LoginCtrl = require('../controllers/login.controllers.js') 


router.post('/register', LoginCtrl.register)

router.post('/login', LoginCtrl.login)

router.get('/validate', LoginCtrl.validateToken)

router.delete('/dUser', LoginCtrl.deleteUser)

module.exports = router