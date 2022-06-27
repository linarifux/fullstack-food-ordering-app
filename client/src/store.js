import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import { getAllPizzasReducer } from './reducers/pizzaReducers'
import { cartReducer } from './reducers/cartReducers'
import { loginUserReducer, registerUserReducer, locateUserReducer, updateUserByIdReducer, getUsersByTypeReducer, getUserByIdReducer } from './reducers/userReducer'
import { postFoodRequestReducer, getAllRequestsByIdReducer, postFoodRequestImageReducer, getAllRequestsReducer, getRequestByIdReducer } from './reducers/requestFoodReducer'
import { restaurantImageReducer, postRestaurantReducer, getAllRestaurantsReducer, getAllRestaurantsByIdReducer, getRestaurantByIdReducer } from './reducers/restaurantReducer'
import { createItemReducer, getAllItemsByIdReducer, getAllItemsReducer, getOneItemByIdReducer } from './reducers/createItemReducers'
import { createNewOrderReducer, getAllOrdersByIdReducer, getOneOrderByIdReducer } from './reducers/orderReducers'



const finalReducer = combineReducers({
    getAllPizzasReducer,
    cartReducer,
    registerUserReducer,
    loginUserReducer,
    updateUserByIdReducer,
    getUsersByTypeReducer,
    getUserByIdReducer,
    postFoodRequestReducer,
    getAllRequestsByIdReducer, 
    postFoodRequestImageReducer,
    getAllRequestsReducer,
    restaurantImageReducer,
    postRestaurantReducer,
    getAllRestaurantsReducer,
    getAllRestaurantsByIdReducer,
    getRestaurantByIdReducer,
    createItemReducer,
    getAllItemsByIdReducer,
    getAllItemsReducer,
    getOneItemByIdReducer,
    getRequestByIdReducer,
    locateUserReducer,
    createNewOrderReducer,
    getAllOrdersByIdReducer,
    getOneOrderByIdReducer,
})

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null

const initialState = {
    cartReducer: {
        cartItems
    },
    loginUserReducer: {
        currentUser
    }
}

const composeEnhancers = composeWithDevTools({})

const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)))


export default store