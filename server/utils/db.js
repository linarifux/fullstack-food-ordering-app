const mongoose = require('mongoose')
const MONGO_URI = 'mongodb+srv://linarifux:Allahuakber1@cluster0.2gmsy.mongodb.net/pizza?retryWrites=true&w=majority'

const conn = async () => {
    try{
        await mongoose.connect(MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true})
        console.log('DB Connected...');
    }catch(e){
        console.log('Error while connecting to DB');
    }
}

module.exports = conn