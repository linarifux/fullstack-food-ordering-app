const express = require('express')
const { createRequest, getAllRequestsById, deleteRequestById, getAllRequests, getRequestById, updateRequestById } = require('../controller/requestedFoodController')
const { uploadFile, getImage } = require('../controller/imageController')
const upload = require('../utils/upload')

const router = express()

router.post('/new', createRequest)
router.get('/all', getAllRequestsById)
router.post('/upload', upload.single('file'), uploadFile)
router.get('/public/uploads/:filename', getImage)
router.delete('/delete/:id', deleteRequestById)
router.get('/allrequests', getAllRequests)

// get request by id
router.get('/:id', getRequestById)
// update request by id
router.put('/:id', updateRequestById)

module.exports = router