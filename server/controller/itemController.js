const Item = require('../model/itemModel')


const createItem = async (req, res) => {
    try {
        const newItem = new Item(req.body)
        await newItem.save()
        res.status(201).send(newItem)
    } catch (e) {
        res.status(500).send(e)
    }
}


const getAllItems = async (req, res) => {
    try {
        const items = await Item.find()
        res.status(200).send(items)
    } catch (e) {
        res.status(500).send(e)
    }
}

const getAllItemsById = async (req, res) => {
    try {
        const items = await Item.find({restaurant: req.params.id})
        res.status(200).send(items)
    } catch (e) {
        res.status(500).send(e)
    }
}

// get one item by ID
const getOneItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        res.status(200).send(item)
    } catch (e) {
        res.status(500).send(e)
    }
}


// delete one item by id
const deleteItemById = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id)
        res.status(200).send(item)
    } catch (e) {
        res.status(500).send(e)
    }
}



module.exports = { createItem, getAllItems, getOneItemById, deleteItemById, getAllItemsById }