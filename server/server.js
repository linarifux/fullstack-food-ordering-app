const express = require('express')
const db = require('./utils/db')
const cors = require('cors')
const path = require('path')
const boydParser = require('body-parser')

const pizzaRouter = require('./routes/pizzaRoute')
const userRouter = require('./routes/userRoute')
const requestedFoodRouter = require('./routes/requestedFoodRoute')
const restaurantRouter = require('./routes/restaurantRoute')
const itemsRouter = require('./routes/itemRoute')
const orderRouter = require('./routes/orderRoute')

const app = express()
const port = process.env.PORT || 8000

db()
app.use('/images', express.static(path.join(__dirname, 'public/uploads')))
app.use(boydParser.json())
app.use(express.json())
app.use(cors())
app.get('/', (req,res) => {
    res.send('server working')
})

app.use('/pizza', pizzaRouter)
app.use('/users', userRouter)
app.use('/requests', requestedFoodRouter)
app.use('/restaurants', restaurantRouter)

// items router
app.use('/food', itemsRouter)

// order router
app.use('/orders', orderRouter)

app.listen(port, () => {
    console.log('server started on: ', port);
})
