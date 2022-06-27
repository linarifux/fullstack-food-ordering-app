const express = require('express')
const pizzaControler = require('../controller/pizzaController')

const router = express.Router()

// get all pizzas
router.get('/all', pizzaControler.getAll )


module.exports = router