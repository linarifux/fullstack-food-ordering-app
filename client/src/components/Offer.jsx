import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById } from '../actions/restaurantAction';
import { addToCart } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom'


const Offer = ({ offer, request }) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const restaurantState = useSelector(state => state.getRestaurantByIdReducer)
    const myrest = restaurantState?.restaurant
    useEffect(() => {
        dispatch(getRestaurantById(offer.restaurant))
    }, [])

    const item = {
        title: request.title,
        _id: request._id,
        image: request.imageUrl,
        variant: null,
        quantity: request.quantity,
        restaurant: offer.owner,
        restaurantName: myrest?.name,
        price: offer.price,
        total: offer.price,
    }
    const quantity = item.quantity
    const variant = item.variant
    const restaurant = item.restaurant
    const restaurantName = item.restaurantName

    const addToTheCart = () => {
        dispatch(addToCart(item, quantity, variant, restaurant, restaurantName))
        localStorage.setItem('offerofrequest', request._id)
        navigate('/cart')
    }

    return (
        <div className='shadow-lg p-3 mb-5 bg-white rounded row d-flex align-items-center'>
            <div className="col-md-4">
                <p className="h2">{offer.restaurantName} <span className='h6 d-block'>{myrest?.address}</span></p>
                <hr />
                <p className="h6">{offer.description}</p>

            </div>
            <div className="col-md-4 d-flex justify-content-around">
                <div>
                    <p className="h4">Delivery Time</p>
                    <p className="h4">{offer.deliveryTime} Hours</p>
                </div>
                <div>
                    <p className="h4">Price</p>
                    <p className="h4">{offer.price} TK</p>
                </div>
            </div>
            <div className="col-md-4">
                <button className="btn-success btn-lg" onClick={addToTheCart}>Accept</button>
            </div>

        </div>
    )
}

export default Offer