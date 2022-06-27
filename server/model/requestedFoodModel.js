const mongoose = require('mongoose')
const requestFoodModelSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String},
    quantity: {type: Number, required: true},
    deliveryTime: {type: Number, required: true},
    offers: [{
        type: Object
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
},
{
    timestamps: true
})


const RequestedFood = new mongoose.model('requestedFood', requestFoodModelSchema)

module.exports = RequestedFood
