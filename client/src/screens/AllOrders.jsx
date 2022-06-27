import React from 'react'
import { useSelector } from 'react-redux'
import CustomerOrders from '../components/CustomerOrders'
import DeliverManOrders from '../components/DeliveryManOrders'
import RestaurantOrders from '../components/RestaurantOrders'

const AllOrders = () => {
    const loggedInUser = useSelector(state => state.loginUserReducer.currentUser)
    return (
        <div style={{ marginBottom: '600px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <p className="h1">All Orders</p>
                        {loggedInUser.userType === 'user' && <CustomerOrders id={loggedInUser._id} />}
                        {loggedInUser.userType === 'restaurant' && <RestaurantOrders id={loggedInUser._id} />}
                        {loggedInUser.userType === 'deliveryMan' && <DeliverManOrders id={loggedInUser._id} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllOrders