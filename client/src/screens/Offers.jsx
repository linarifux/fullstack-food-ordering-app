import React, { useEffect, useState } from 'react'
import Offer from '../components/Offer'
import Loading from '../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getRequestById } from '../actions/requestFoodAction'

const id = localStorage.getItem('requestId')

const Offers = () => {
  const dispatch = useDispatch()
  const requestState = useSelector(state => state.getRequestByIdReducer)
  const { foodRequest } = requestState
  const {offers} = foodRequest

  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12">
          <p className="h1">All Offers</p>
          <div className="row" style={{ marginBottom: '350px' }}>
            {offers ? offers.map((offer, index) => {
              // console.log(offer)
              return <Offer offer={offer} request={foodRequest} key={index} />
            }) : (<Loading />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Offers