import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllRequestsById, getAllRequests } from '../actions/requestFoodAction'
import Error from '../components/Error'
import Loading from '../components/Loading'
import Requests from '../components/Requests'

const FoodRequest = () => {
    const dispatch = useDispatch()
    const requestsState = useSelector(state => state.getAllRequestsByIdReducer)
    const { requests, error, loading } = requestsState
    const reqstate = useSelector(state => state.getAllRequestsReducer)
    const { reqs, e, load } = reqstate
    const loggedInUser = useSelector(state => state.loginUserReducer.currentUser)
    if (loggedInUser) {
        var { userType } = loggedInUser
    }

    useEffect(() => {
        dispatch(getAllRequestsById())
        if (loggedInUser && userType === 'restaurant') {
            dispatch(getAllRequests())
        }
    }, [requests])
    if (userType === 'restaurant') {
        return (
            <>
                <div className="container" style={{marginBottom: '400px'}}>
                    <div className='h1 mt-5'>All Requests</div>
                    <div className="row">
                        {load ? (<Loading />) : e ? (<Error message={'Something went Wrong'} type={'danger'} />) : (
                            reqs.map(req => {
                                return (
                                    <div className="col-md-12">
                                        <Requests request={req} key={req._id}/>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className='h1'>Can't find what you want? Post your Food Request now.</div>
            <div className='h2'><Link to={'/request/new'}>Request Food</Link></div>
            <div className='h1 mt-5'>Previous Requests</div>
            <div className="container" style={{marginBottom: '500px'}}>
                <div className="row">
                    {loading ? (<Loading />) : error ? (<Error message={'Something went Wrong'} type={'danger'} />) : (
                        requests.map(req => {
                            return (
                                <div className="col-md-12">
                                    <Requests request={req} />
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </>
    )
}

export default FoodRequest