const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: { type: String, required: true },
    description: { type: String, required: true },
    video: {type: String},
    category: { type: String, required: true, default: 'all' },
    variants: [{
        name: {type: String},
        price: { type: Number },
        calories: { type: Number, default: 100 }
    }],
    price: {type: Number},
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants'
    }
})

const Item = mongoose.model('items', itemSchema)

module.exports = Item