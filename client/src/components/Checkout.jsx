import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import { emptyCart } from '../actions/cartActions'
import { createNewOrder } from '../actions/checkoutActions'
import { deleteFoodRequest } from '../actions/requestFoodAction'
import { getUsersByType } from '../actions/userActions'

const Checkout = ({ order, subtotal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getUsersByType('deliveryMan'))
  }, [])

  const deliveryManState = useSelector(state => state.getUsersByTypeReducer)
  const users = deliveryManState?.users

  const tokenHandler = (token) => {
    if (JSON.parse(localStorage.getItem('currentUser'))?.userType !== 'user') {
      navigate('/login')
    } else {
      order.deliveryMan = users[Math.floor(Math.random() * users?.length)]._id
      order.token = token
      localStorage.removeItem('cartItems')
      dispatch(createNewOrder(order))
      dispatch(emptyCart())
      if (order.requestId) {
        dispatch(deleteFoodRequest(order.requestId))
      }
      navigate('/orders')
    }

  }


  return (
    <StripeCheckout
      amount={subtotal * 100}
      token={tokenHandler}
      stripeKey={process.env.REACT_APP_KEY}
      currency='BDT'
    >
      <button className="btn">Pay Now</button>
    </StripeCheckout>
  )
}

export default Checkout