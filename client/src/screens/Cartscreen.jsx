import React from 'react'
import * as tt from '@tomtom-international/web-sdk-services'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { useSelector, useDispatch } from 'react-redux'
import { FaPlusCircle, FaMinusCircle, FaTrash } from 'react-icons/fa'
import { addToCart, deleteFromCart, emptyCart } from '../actions/cartActions'
import Checkout from '../components/Checkout'
import { useEffect } from 'react'
import { getRestaurantById } from '../actions/restaurantAction'
import { useState } from 'react'
import { getUsersByType, updateUserById } from '../actions/userActions'
import { createNewOrder } from '../actions/checkoutActions'
import { useNavigate } from 'react-router-dom'


const Cartscreen = () => {
    let cartState = useSelector(state => state.cartReducer)
    let cartItems = cartState.cartItems
    const dispatch = useDispatch()
    const subtotal = cartItems.reduce((x, item) => x + item.total, 0)
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    // get restaurant location
    const restaurantId = localStorage.getItem('selectedRestaurant')
    // console.log(restaurantId);
    const userLocation = localStorage.getItem('userLocation')
    const [userLatLng, setUserLatLng] = useState({})

    const restaurantState = useSelector(state => state.getRestaurantByIdReducer)
    const restaurant = restaurantState?.restaurant

    const deliveryManState = useSelector(state => state.getUsersByTypeReducer)
    const users = deliveryManState?.users

    const { lat, lng } = userLatLng

    const routeOptions = {
        key: 'sy8o36LOzUIQkDlNT6ADlmZaqixAGgD4',
        travelMode: 'bicycle',
        locations: `${restaurant?.restLocation?.lng},${restaurant?.restLocation?.lat}:${lng},${lat}`
    }

    const [travelTime, setTravelTime] = useState('')
    const [distance, setDistance] = useState('')

    const vat = Math.ceil(subtotal * 0.07)
    const deliveryCharge = parseInt(20 + travelTime)
    const totalPrice = subtotal + vat + deliveryCharge

    useEffect(async () => {
        dispatch(getRestaurantById(restaurantId))
        dispatch(getUsersByType('deliveryMan'))
        const results = await geocodeByAddress(userLocation)
        var latLng = await getLatLng(results[0])
        setUserLatLng(latLng)
        const res = await tt.services.calculateRoute(routeOptions)
        setTravelTime(((Math.ceil((res.routes[0].summary.travelTimeInSeconds) / 60) + 0)))
        setDistance(Math.ceil((res.routes[0].summary.lengthInMeters) / 1000))
    }, [userLatLng])


    const order = {
        orderId: Date.now().toString(),
        items: cartItems,
        totalPrice,
        deliveryCharge,
        vat,
        restaurant: restaurant?._id,
        restaurantName: restaurant?.name,
        customer: currentUser?._id,
        paymentInfo: {
            type: 'cash',
        },
        customerLocation: userLocation
    }

    const onlineOrder = {
        orderId: Date.now().toString(),
        items: cartItems,
        totalPrice,
        deliveryCharge,
        vat,
        restaurant: restaurant?._id,
        restaurantName: restaurant?.name,
        customer: currentUser?._id,
        requestId: localStorage.getItem('offerofrequest'),
        paymentInfo: {
            type: 'card',
        },
        customerLocation: userLocation
    }

    // console.log(Math.floor(Math.random()*users?.length));
    const navigate = useNavigate()

    const payCash = () => {
        if (JSON.parse(localStorage.getItem('currentUser'))?.userType !== 'user') {
            navigate('/login')
        } else {
            order.deliveryMan = users[Math.floor(Math.random() * users?.length)]._id
            const data = {
                isAvailable: false
            }
            dispatch(updateUserById(order.deliveryMan, data))
            localStorage.removeItem('cartItems')
            dispatch(emptyCart())
            dispatch(createNewOrder(order))
            navigate('/orders')
        }
    }


    return (
        <div style={{ height: '600px' }}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 style={{ fontSize: '40px' }}>My Cart</h2>
                    {cartItems.map(item => {
                        return <div className="flex-container" key={item._id}>
                            <div className='m-1 w-100'>
                                <p className="h1">{item.restaurantName}</p>
                                <h1>{item.title}</h1>
                                <h1>Price: {item.quantity} * {item.price} = {item.price * item.quantity}</h1>
                                <h1>
                                    Quantity:
                                    <FaPlusCircle className={`plus ${item.quantity > 9 ? 'disabled' : ''}`} onClick={() => dispatch(addToCart(item, (item.quantity * 1) + 1, item.variant || null))} />
                                    <b>{item.quantity}</b>
                                    <FaMinusCircle className={`minus ${item.quantity < 2 ? 'disabled' : ''}`} onClick={() => dispatch(addToCart(item, item.quantity - 1, item.variant || null))} />
                                </h1>
                                <hr />
                            </div>
                            <div className='m-1 w-100 d-flex align-items-center justify-content-center'>
                                <img src={item.image} style={{ height: '80px', width: '80px' }} />
                            </div>
                            <div className='m-1 w-100 d-flex align-items-center justify-content-center'>
                                <FaTrash className='trash' onClick={() => dispatch(deleteFromCart(item))} />
                            </div>
                        </div>
                    })}
                </div>
                <div className="col-md-4">

                    <h2>Subtotal: {Math.ceil(subtotal)} Tk</h2>
                    <h2>Delivery: {cartItems.length !== 0 ? deliveryCharge : 0} TK</h2>
                    <h2>Vat: {cartItems.length !== 0 ? vat : 0} TK</h2>
                    <h2 style={{ fontSize: '45px' }}>Total(incl. vat): {cartItems.length !== 0 ? totalPrice : 0}</h2>
                    <div className="d-flex align-items-center justify-content-center gap-5">
                        <Checkout order={onlineOrder} subtotal={totalPrice} users={users} />
                        <button className="btn" onClick={payCash}>Pay Cash</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cartscreen