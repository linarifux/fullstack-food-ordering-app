import React from 'react'
import LocationSearch from '../components/LocationSearch'
import { ToggleOn, ToggleOff } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserById } from '../actions/userActions'
import { useEffect } from 'react'
import { getAllDeliveryMansOrdersById } from '../actions/checkoutActions'
import Order from '../components/Order'

const DeliveryManHome = () => {

    const { user } = useSelector(state => state.updateUserByIdReducer)
    console.log('user', user);
    const check = user?.isAvailable
    console.log('check', check);

    const dispatch = useDispatch()
    const { _id } = JSON.parse(localStorage.getItem('currentUser'))
    const available = JSON.parse(localStorage.getItem('currentUser')).isAvailable
    console.log('available', available);

    const [isAvailable, setIsAvailable] = React.useState(check ? check : available)
    const toggleButton = () => {
        console.log(isAvailable);
        setIsAvailable(!isAvailable)
        const data = {
            isAvailable
        }
        dispatch(updateUserById(_id, data))
    }

    useEffect(() => {
        dispatch(getAllDeliveryMansOrdersById(_id))
    }, [])

    const ordersState = useSelector(state => state.getAllOrdersByIdReducer)
    const orders = ordersState?.orders

    const runningOrder = orders?.filter(order => order.orderStatus !== 'Delivered')
    console.log(runningOrder)

    return (
        <div style={{ marginBottom: '600px' }} className='position-relative'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className='d-flex align-items-center gap-3 position-absolute' style={{ top: '-45px' }}>
                            <p className="h1">Availability</p>
                            <ToggleOn style={{ fontSize: '40px', display: `${isAvailable ? 'none' : 'block'}` }} onClick={toggleButton} />
                            <ToggleOff style={{ fontSize: '40px', display: `${isAvailable ? 'block' : 'none'}` }} onClick={toggleButton} />
                        </div>
                        <div style={{ margin: '20px 0' }}>
                            <LocationSearch />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p className="h1">Current Order</p>
                        {runningOrder?.length !== 0 && <div className="shadow-lg p-3 mb-5 bg-white rounded">
                            <p className="h5">Order: {runningOrder && runningOrder[0]?._id}</p>
                            <p className="h1">{runningOrder && runningOrder[0]?.restaurantName}</p>
                            <p className="h4">{runningOrder && runningOrder[0]?.restaurant?.restLocation?.address}</p>
                            {runningOrder && runningOrder[0]?.items.map(item => {
                                return (
                                    <div className="div">
                                        <p>{item.title}: {item.price} * {item.quantity} = {item.total}</p>
                                    </div>
                                )
                            })}
                            <hr />
                            <p className="h1">{runningOrder && runningOrder[0]?.customer?.name}</p>
                            <p className="h5">{runningOrder && runningOrder[0]?.customerLocation}</p>
                            <p className="h4">Payment: {runningOrder && runningOrder[0]?.paymentInfo?.type}</p>
                            <p className="h3">Phone: {runningOrder && runningOrder[0]?.customer?.phone}</p>
                            <hr />
                            <p className="h2">
                                Status : {runningOrder && runningOrder[0]?.orderStatus}
                            </p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryManHome