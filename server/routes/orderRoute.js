const express = require('express')
const { createOrder, getAllCustomerOrders, getOneOrderById, deleteOneOrderById, getAllRestaurantOrders, getAllDeliveryManantOrders, updateOneOrderById } = require('../controller/orderController')

const router = express.Router()


// create an order
router.post('/new', createOrder)

// get all order
router.get('/customers/:id', getAllCustomerOrders)
router.get('/all/restaurants/:id', getAllRestaurantOrders)
router.get('/all/deliverymans/:id', getAllDeliveryManantOrders)

// get one order by ID
router.get('/:id', getOneOrderById)

/// delete one order by ID
router.delete('/:id', deleteOneOrderById)

// update an order by id
router.put('/update/:id', updateOneOrderById)


module.exports = router