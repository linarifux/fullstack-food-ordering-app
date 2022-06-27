import React from 'react'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Filter from '../components/Filter'
import { getAllRestaurants, getRestaurantById } from '../actions/restaurantAction'
import { Link, useNavigate } from 'react-router-dom'
import LocationSearch from '../components/LocationSearch'
import HotProduct from '../components/HotProduct'
import DeliveryManHome from './DeliveryManHome'

const Homescreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const restaurantState = useSelector(state => state.getAllRestaurantsReducer)
    const loggedInUser = useSelector(state => state.loginUserReducer.currentUser)

    const { restaurants, loading, error } = restaurantState
    const cartItems = JSON.parse(localStorage.getItem('cartItems'))
    const selectedRestaurant = localStorage.getItem('selectedRestaurant')

    function callRestaurant(id, name) {
        if (cartItems && cartItems.length !== 0) {
            if (id !== selectedRestaurant) {
                alert('You cannot select food from another restaurant, because you have already added food to cart from another restaurant. Empty the cart first if you wish to select food from another restaurant.')
                navigate('/cart')
            } else {
                localStorage.setItem('selectedRestaurant', id)
                localStorage.setItem('restaurantName', name)
                dispatch(getRestaurantById(id))
                navigate(`/restaurants/${id}`)
            }

        } else {
            localStorage.setItem('selectedRestaurant', id)
            localStorage.setItem('restaurantName', name)
            dispatch(getRestaurantById(id))
            navigate(`/restaurants/${id}`)
        }
    }

    useEffect(() => {
        dispatch(getAllRestaurants())
    }, [dispatch])


    if (loggedInUser?.userType === 'deliveryMan') {
        return <DeliveryManHome />
    }

    return (
        <div className='container'>
            <LocationSearch />
            <HotProduct />
            {/* <Filter /> */}
            <p className="h1 mb-5">All Restaurants Near You</p>
            <div className="row">
                {loading ? (<Loading />) : error ? (<Error message={'Something went wrong'} type={'danger'} />) : (
                    restaurants.map(rest => {
                        return (
                            <div className="col-md-4" key={rest._id}>
                                <img src={rest.coverImageUrl} alt="Restaurant" className='img-fluid' style={{ height: '300px' }} />
                                <p className='h1' style={{ cursor: 'pointer' }} onClick={() => callRestaurant(rest._id, rest.name)}>{rest.name}</p>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}


export default Homescreen