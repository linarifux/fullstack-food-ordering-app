import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllItemsById } from '../actions/createitemAction'
import FoodView from './FoodView'

const Restaurant = () => {

  const dispatch = useDispatch()
  const singleRestaurant = useSelector(state => state.getRestaurantByIdReducer)
  const { restaurant } = singleRestaurant
  const restaurantItems = useSelector(state => state.getAllItemsByIdReducer)
  const { items } = restaurantItems
  
  
  useEffect(() => {
    dispatch(getAllItemsById(restaurant._id))

  }, [dispatch, restaurant._id])


  return (
    <div style={{marginBottom: '350px'}}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p className="h1">{restaurant.name}</p>
            <img src={restaurant.coverImageUrl} alt="Restaurant" className='img-fluid' style={{ height: '300px' }} />
          </div>
          <div className="col-md-12 mt-5">
            <p className="h1">All Foods</p>
          </div>
          {items.map(item => {
            return (
              <>
                <FoodView item={item} />
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Restaurant

