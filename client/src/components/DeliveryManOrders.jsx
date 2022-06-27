import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDeliveryMansOrdersById } from '../actions/checkoutActions'
import Order from './Order'
import Loading from '../components/Loading'

const DeliverManOrders = ({ id }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllDeliveryMansOrdersById(id))
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

export default DeliverManOrders