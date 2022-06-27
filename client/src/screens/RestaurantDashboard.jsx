import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllRestaurantsById, getRestaurantById } from '../actions/restaurantAction'
import Loading from '../components/Loading'


const RestaurantDashboard = () => {

  const dispatch = useDispatch()

  function callRestaurant(id) {
    dispatch(getRestaurantById(id))
  }

  useEffect(() => {
    dispatch(getAllRestaurantsById())
  }, [dispatch])

  const allRestaurants = useSelector(state => state.getAllRestaurantsByIdReducer)
  const { restaurants, loading } = allRestaurants
  return (
    <div style={{marginBottom: '460px'}}>
      <div className="container" style={{marginBottom: '100px'}}>
        <h1>Hello {JSON.parse(localStorage.getItem('currentUser')).name.split(' ')[0]}</h1>
        <Link to={'/restaurant/new'} style={{ color: 'inherit', textDecoration: 'none' }}><button className="btn">Open New Restaurant</button></Link>
        <p className="h1 m-5">
          Your Restaurants
        </p>
          {(loading && <Loading />) || <div className="row"> {
            restaurants.map(rest => {
              return (
                <div className="col-md-4">
                  <img src={rest.coverImageUrl} className='img-fluid' alt="" />
                  <Link to={`/restaurants/${rest._id}`} style={{ color: 'inherit' }}><p className='h1' onClick={() => callRestaurant(rest._id)}>{rest.name}</p></Link>
                  <p>{(rest.rating / rest.allRatings) === NaN ? rest.rating / rest.allRatings : 0}/<span>{rest.allRatings}</span></p>
                </div>
              )
            })
          }
          </div>
          }
      </div>
    </div>
  )
}

export default RestaurantDashboard