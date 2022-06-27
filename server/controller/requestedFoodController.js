const RequestedFood = require('../model/requestedFoodModel')

const createRequest = async (req,res) => {
    try{
        const request = new RequestedFood(req.body)
        await request.save()
        res.status(201).send(request)
    }catch(e){
        res.status(500).send(e)
    }
}

const getAllRequestsById = async (req,res) => {
    try{
        const requests = await RequestedFood.find({user: req.headers.authorization})
        res.status(200).send(requests)
    }catch(e){
        res.status(500).send(e)
    }
}

const deleteRequestById = async (req, res) => {
    try{
        const delReq = await RequestedFood.findByIdAndDelete(req.params.id)
        res.status(200).send(delReq)
    }catch(e){
        res.status(500).send(e)
    }
}

const getAllRequests = async (req, res) => {
    try{
        const reqs = await RequestedFood.find().populate('user')
        res.status(200).send(reqs)
    }catch(e){
        res.status(500).send(e)
    }
}

/// get one request by ID
const getRequestById = async (req, res) => {
    try{
        const request = await RequestedFood.findById(req.params.id).populate('user')
        res.status(200).send(request)
    }catch(e){
        res.status(500).send(e)
    }
}

/// update one request by ID
const updateRequestById = async (req, res) => {
    try{
        const request = await RequestedFood.findById(req.params.id)
        request.offers.push(req.body)
        await request.save()
        res.status(201).send(request)
    }catch(e){
        res.status(504).send(e)
    }
}


module.exports = {
    createRequest,
    getAllRequestsById,
    deleteRequestById,
    getAllRequests,
    getRequestById,
    updateRequestById
}