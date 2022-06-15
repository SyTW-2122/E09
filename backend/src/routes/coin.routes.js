const { Router } = require('express');
const router = Router()

//create a route for the root path
router.get('/', (req, res) => {
    res.send('Hello World!');
})

module.exports = router