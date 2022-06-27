import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomersOrdersById } from '../actions/checkoutActions'
import Order from './Order'
import Loading from '../components/Loading'

const CustomerOrders = ({ id }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllCustomersOrdersById(id))
    }, [])

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

export default CustomerOrders