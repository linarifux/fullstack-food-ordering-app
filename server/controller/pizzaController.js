const Pizza = require('../model/pizzaModel')

const getAll = async (req,res) => {
    try{
        const pizzas = await Pizza.find()
        res.status(200).send(pizzas)
    }catch(e){
        res.status(500).send(e)
    }
}

module.exports = {getAll}