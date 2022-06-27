
const Order = require("../model/orderModel")


const createOrder = async (req, res) => {
    try{
        const order = new Order(req.body)
        await order.save()
        res.status(201).send(order)
    }catch(e){
        res.status(500).send(e)
    }
}

const getAllCustomerOrders = async (req, res) => {
    try{
        const orders = await Order.find()
        const filterOrders = orders.filter(order => JSON.stringify(order.customer) === JSON.stringify(req.params.id))
        res.status(200).send(filterOrders)
    }catch(e){
        res.status(500).send(e)
    }
}

const getAllRestaurantOrders = async (req, res) => {
    try{
        const id = req.params.id
        const orders = await Order.find()
        const filteredOrders = orders.filter(order => JSON.stringify(id) === JSON.stringify(order.restaurant))
        res.status(200).send(filteredOrders)
    }catch(e){
        res.status(500).send(e)
    }
}

const getAllDeliveryManantOrders = async (req, res) => {
    try{
        const id = req.params.id
        const orders = await Order.find()
        .populate('customer')
        .populate('restaurant')
        const filteredOrders = orders.filter(order => JSON.stringify(id) === JSON.stringify(order.deliveryMan))
        res.status(200).send(filteredOrders)
    }catch(e){
        res.status(500).send(e)
    }
}



const getOneOrderById = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id)
        if(!order){
            return res.status(404).send('NO ORDERS FOUND')
        }
        res.status(200).send(order)
    }catch(e){
        res.status(500).send(e)
    }
}

// update one order by id
const updateOneOrderById = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id)
        order.orderStatus = req.body.data
        await order.save()
        res.status(200).send(order)
        
    }catch(e){
        res.status(500).send(e)
    }
}

const deleteOneOrderById = async (req, res) => {
    try{
        const order = await Order.findByIdAndDelete(req.params.id)
        if(!order){
            return res.status(404).send('NO ORDERS FOUND')
        }
        res.status(200).send(order)
    }catch(e){
        res.status(500).send(e)
    }
}


module.exports = {createOrder, getAllCustomerOrders, getOneOrderById, deleteOneOrderById, getAllRestaurantOrders, getAllDeliveryManantOrders, updateOneOrderById }