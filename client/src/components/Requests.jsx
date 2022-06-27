import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFoodRequest, getRequestById } from '../actions/requestFoodAction'
import { BsAppIndicator } from 'react-icons/bs'

const Requests = ({ request }) => {
    const loggedInUser = useSelector(state => state.loginUserReducer.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('requestId')
    }, [])

    if (loggedInUser) {
        var { userType } = loggedInUser
    }

    const sendOffer = (e) => {
        dispatch(getRequestById(request._id))
    }
    const creationDate = (request.createdAt).split('T')[0]
    const creationTime = `${new Date(request.createdAt).getUTCHours() + 6}:${new Date(request.createdAt).getUTCMinutes() < 9 ? `0${new Date(request.createdAt).getUTCMinutes()}` : new Date(request.createdAt).getUTCMinutes()}`
    const deleteRequest = () => {
        dispatch(deleteFoodRequest(request._id))
        navigate('/requests')
    }

    const [isSent, setIsSent] = useState(false)

    useEffect(() => {
        request.offers.map(offer => {
            if (offer.owner === loggedInUser._id) {
                setIsSent(true)
            }
        })
    }, [request, navigate])

    const [iconColor, setIconColor] = useState('text-dark')

    const showOffers = (e) => {
        e.preventDefault()
        localStorage.setItem('requestId', request._id)
        localStorage.setItem('request', JSON.stringify(request))
        dispatch(getRequestById(request._id))
        navigate('/offers')
    }


    return (
        <div className='shadow-lg p-3 mb-5 bg-white rounded d-flex align-items-center justify-content-between position-relative'>
            <div><h1>{creationDate}</h1><h1>{creationTime}</h1></div>
            <div className='w-50'>
                {userType === 'restaurant' && (<h1 className='text-primary'>{request.user ? request.user.name : 'Expired'}</h1>)}
                <h1>{request.title}</h1>
                <p>{request.description}</p>
                <p>For: {request.quantity} people</p>
                <p>Deliver in next: {request.deliveryTime} Hours</p>
            </div>
            <img src={request.imageUrl} alt="Food" style={{ height: '150px' }} />
            <div>
                <img src={request.imgUrl} />
            </div>
            <div className="actions d-flex flex-column gap-5">
                {request.user && loggedInUser && userType === 'restaurant' ? isSent ? <button className="btn primary" disabled >Offer Sent</button> : <Link to={'/request/offer'}><button className="btn primary" onClick={(e) => sendOffer(e)} >Send Offer</button></Link> : <button className="btn primary" onClick={(e) => deleteRequest()}>Delete</button>}
                {loggedInUser.userType === 'user' && request.offers.length > 0 && <BsAppIndicator className={`position-absolute top-0 right-0 mt-2 mx-4 p-10 fs-1 ${iconColor}`} style={{ cursor: 'pointer' }} onClick={(e) => showOffers(e)} />}
            </div>
        </div>
    )
}

export default Requests