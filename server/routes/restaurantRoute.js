const express = require('express')
const { uploadFile, getImage } = require('../controller/imageController')
const upload = require('../utils/upload')

const {createRestaurant, getAllRestaurant, getRestarantByOwner, getRestaurantById, updateRestaurantById} = require('../controller/restaurantController')
const router = express.Router()

router.post('/new', createRestaurant)
router.get('/all', getAllRestaurant)
router.get('/my-restaurants', getRestarantByOwner)
router.get('/:id', getRestaurantById)
router.put('/:id', updateRestaurantById)

// image
router.post('/upload', upload.single('file'), uploadFile)
router.get('/public/uploads/:filename', getImage)

module.exports = router