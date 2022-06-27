const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    coverImageUrl: {type: String, required: true},
    type: {type: String, required: true},
    restLocation: {
        address: {type: String},
        lat: {type: Number},
        lng: {type: Number}
    },
    open: {type: String},
    close: {type: String},
    isOpen: {type: Boolean, required: true, default: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    rating: {type: Number, default: 0},
    allRatings: {type: Number, default: 0}
},
{
    timestamps: true
})
const Restaurant = mongoose.model('restaurants', restaurantSchema)

module.exports = Restaurant

