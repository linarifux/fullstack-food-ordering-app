import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateOneOrderById } from '../actions/checkoutActions'
import { getUserById, updateUserById } from '../actions/userActions'

const Order = ({ order }) => {

    const navigate = useNavigate()

    const [orderStatus, setOrderUpdate] = useState('')
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const dispatch = useDispatch()

    const updateOrder = () => {
        dispatch(updateOneOrderById(order._id, orderStatus))
        if (orderStatus === 'Delivered') {
            const data = {
                isAvailable: true
            }
            dispatch(updateUserById(order.deliveryMan, data))
        }
    }

    useEffect(() => {
        dispatch(getUserById(order.customer))
    }, [])

    const userState = useSelector(state => state.getUserByIdReducer)
    const user = userState?.user

    const viewOnMap = () => {
        localStorage.setItem('customerLocation', order.customerLocation)
        navigate('/map')
    }

    return (
        <div className='shadow-lg p-3 mb-5 bg-white rounded'>
            {order?.orderStatus === 'Processing' && <p className='h2'>Running Order <hr></hr></p>}
            <p className="h1">{order?.restaurantName}</p>
            <div className="items">
                {order?.items?.map(item => {
                    return <p>{item.title} = {item.price} * {item.quantity}</p>
                })}
            </div>
            <p className="h4">Total Price = {order?.totalPrice} BDT</p>
            <p className="h4">Order Status: {order?.orderStatus}</p>
            {currentUser.userType === 'restaurant' && <div>
                <select name="orderStatus" id="orderStatus" className='form-control' onChange={e => setOrderUpdate(e.target.value)}>
                    <option value="none">Update Order</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>
                <button className="btn my-2" onClick={updateOrder}>Update</button>
            </div>}
            {currentUser.userType === 'deliveryMan' && <div>
            <p className='h4'>Customer: {order?.customer?.name}</p>
            <p className="h4">Customer Phone: {order?.customer?.phone}</p>
            <p className="h5">Customer Location: {order?.customerLocation}</p>
            {/* <button className="btn" onClick={viewOnMap}>See Route</button> */}
            </div>}
        </div>
    )
}

export default Order