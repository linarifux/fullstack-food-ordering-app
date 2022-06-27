const Restaurant = require('../model/restaurantModel')

const createRestaurant = async (req,res) => {
    try{
        const rest = new Restaurant(req.body)
        await rest.save()
        res.status(201).send(rest)
    }catch(e){
        res.status(500).send(e)
        console.log(e);
    }
}

const getAllRestaurant = async (req, res) => {
    try{
        const rests = await Restaurant.find()
        res.status(200).send(rests)
    }catch(e){
        res.status(500).send(e)
    }
}

const getRestarantByOwner = async (req, res) => {
    try{
        const rests = await Restaurant.find({owner: req.headers.authorization})
        res.status(200).send(rests)
    }catch(e){
        res.status(500).send(e)
    }
}

const getRestaurantById = async (req, res) => {
    try{
        const rest = await Restaurant.findById(req.params.id)
        if(!rest){
            return res.status(404).send('No Restaurants Found!')
        }
        res.status(200).send(rest)
    }catch(e){
        res.status(500).send(e)
    }
}

const updateRestaurantById = async (req, res) => {
    try{
        const rest = await Restaurant.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).send(rest)
    }catch(e){
        res.status(500).send(e)
    }
}

module.exports = {
    createRestaurant,
    getAllRestaurant,
    getRestarantByOwner,
    getRestaurantById,
    updateRestaurantById
}

