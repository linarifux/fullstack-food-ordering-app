import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateRequestById } from '../actions/requestFoodAction'
import { getAllRestaurantsById } from '../actions/restaurantAction'
import Loading from '../components/Loading'

const MakeOffer = () => {
    const requestState = useSelector(state => state.getRequestByIdReducer)
    const request = requestState?.foodRequest

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllRestaurantsById())
    }, [dispatch])

    const allRestaurants = useSelector(state => state.getAllRestaurantsByIdReducer)
    const { restaurants } = allRestaurants
    const owner = restaurants[0]?.owner

    const [yourRestaurant, setYourRestaurant] = useState()


    const [offer, setOffer] = React.useState({
        description: '',
        deliveryTime: '',
        price: '',
        owner
    })

    

    const onchangeHandler = (e) => {
        e.preventDefault()
        setOffer({ ...offer, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        const id = request._id
        offer.restaurant = yourRestaurant._id
        offer.restaurantName = yourRestaurant.name
        dispatch(updateRequestById(id, offer))
        navigate('/')
        console.log(offer);
    }
    if(!requestState){
        return <Loading />
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-around align-items-center gap-2">
                    <div>
                        <p className='h2'>{request && request.title}</p>
                        <hr />
                        <p className="h5">{request && request.description}</p>
                        <hr />
                        <div className="d-flex justify-content-around">
                            <p className="h2">For {request.quantity} people</p>
                            <div className="vr mx-2" style={{ height: '50px' }}></div>
                            <p className="h2">Deliver in {request.deliveryTime} Hours</p>
                        </div>
                    </div>
                    <div>
                        <img className='img-fluid' src={request.imageUrl} alt="Food" style={{ height: '300px', width: '400px' }} />
                    </div>
                </div>
                <div className="col-md-12">
                    <p className="h1">Make an Offer</p>
                    <hr />
                    <div className="d-flex">
                        <textarea name="description" id="description" cols="30" rows="5" placeholder='Describe your offer here' className='form-control w-50 mx-2' value={offer.description} onChange={e => onchangeHandler(e)}></textarea>
                        <div className='d-flex gap-5'>
                            <div>
                                <p>Delivery Time</p>
                                <input type="number" className='form-control' name='deliveryTime' value={offer.deliveryTime} onChange={e => onchangeHandler(e)} /> Hours
                            </div>
                            <div>
                                <p>Price</p>
                                <input type="number" className='form-control' name='price' value={offer.price} onChange={e => onchangeHandler(e)} /> TK
                            </div>
                        </div>
                    </div>
                    <select name="restaurant" id="restaurant" className='form-control w-50 text-center mt-2' onChange={e =>setYourRestaurant(JSON.parse(e.target.value))}>
                        <option value="none">Select a Restaurant</option>
                        {restaurants.map(rest => {
                            return <option value={JSON.stringify(rest)}>{rest.name}</option>
                        })}
                    </select>
                    <button className="btn my-5" onClick={handleSubmit}>Send Offer</button>
                </div>
            </div>
        </div >
    )
}

export default MakeOffer