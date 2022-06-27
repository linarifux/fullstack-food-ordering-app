const express = require('express')
const {createUser, loginUser, updateUserById, getUsersByType, getUserById} = require('../controller/userController')

const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUser)
router.put('/update/:id', updateUserById)
router.get('/:type', getUsersByType)

router.get('/user/:id', getUserById)

module.exports = router
