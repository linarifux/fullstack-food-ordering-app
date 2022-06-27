import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRestaurantsOrdersById } from '../actions/checkoutActions'
import Order from './Order'
import Loading from '../components/Loading'
import { getAllRestaurantsById } from '../actions/restaurantAction'

const RestaurantOrders = ({ id }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllRestaurantsById(id))
    }, [])

    const restaurantsstate = useSelector(state => state.getAllRestaurantsByIdReducer)

    const restaurants = restaurantsstate?.restaurants
    console.log(restaurants);
    var restIds = []

    useEffect(() => {
        restaurants.map(rest => restIds.push(rest._id))
    }, [restaurants])

    useEffect(() => {
        dispatch(getAllRestaurantsOrdersById(restIds[0]))
    }, [restaurants])

    const ordersState = useSelector(state => state.getAllOrdersByIdReducer)
    const orders = ordersState?.orders

    return (
        <div>
            <div className="container">
                <div className="row">
                    {orders ? orders.map(order => {
                        return (
                            <div className="col-md-4" key={order.orderId}>
                                <Order order={order} />
                            </div>
                        )
                    }) : <Loading />}

                </div>
            </div>
        </div>
    )
}

export default RestaurantOrders