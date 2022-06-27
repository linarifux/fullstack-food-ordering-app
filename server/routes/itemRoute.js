const express = require('express')
const { getAllItems, createItem, getOneItemById, deleteItemById, getAllItemsById } = require('../controller/itemController')

const router = express.Router()

// get all items
router.get('/all', getAllItems)

// create an item
router.post('/new', createItem)
// /get a single item by ID
router.get('/:id', getOneItemById)
// delete an item by ID
router.delete('/:id', deleteItemById)

// get all items by restaurant ID
router.get('/all/:id', getAllItemsById)


module.exports = router