const { Router } = require('express');
const router = Router()

const LoginCtrl = require('../controllers/login.controllers.js') 


router.post('/register', LoginCtrl.register)

router.post('/login', LoginCtrl.login)

router.get('/prueba', LoginCtrl.validateToken, (req, res) => {
    res.send("Puedes acceder!")
})

module.exports = router