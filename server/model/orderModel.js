const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderId: {type: String, required: true},
    items: [{type: Object, required: true}],
    vat: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    deliveryCharge: {type: Number, required: true},
    restaurantName: {type: String, required: true},
    customerLocation:{type: String, required: true},
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    deliveryMan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    orderStatus: {type: String, required: true, default: 'Processing'},
    paymentInfo: {type: Object, required: true},
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'requestedFood'
    }
},
{
    timestamps: true
})


const Order = mongoose.model('orders', orderSchema)

module.exports = Order