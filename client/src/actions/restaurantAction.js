import axios from "axios"

const authAxios = axios.create({
    headers: {
        Authorization: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser'))._id : ''
        // Authorization: JSON.parse(localStorage.getItem('currentUser'))._id?JSON.parse(localStorage.getItem('currentUser'))._id:''
    }
})

export const postRestaurant = (restaurant) => async dispatch => {
    dispatch({ type: 'RESTAURANT_POST_REQUEST' })
    try {
        await axios.post('/restaurants/new', restaurant)
        dispatch({ type: 'RESTAURANT_POST_SUCCESS'})
    } catch (error) {
        dispatch({ type: 'RESTAURANT_POST_FAILED', payload: error })
    }
}

// Get all restaurants
export const getAllRestaurants =  () => async (dispatch) => {
    dispatch({type: 'GET_RESTAURANTS_REQUEST'})

    try{
        const response = await axios.get('/restaurants/all')
        dispatch({type: 'GET_RESTAURANTS_SUCCESS', payload: response.data})

    }catch(error){
        dispatch({type: 'GET_RESTAURANTS_FAILED', payload: error})
    }

}


// get all restaurants by owner
export const getAllRestaurantsById =  () => async (dispatch) => {
    dispatch({type: 'GET_RESTAURANTSBYID_REQUEST'})

    try{
        const response = await authAxios.get('/restaurants/my-restaurants')
        dispatch({type: 'GET_RESTAURANTSBYID_SUCCESS', payload: response.data})
    }catch(error){
        dispatch({type: 'GET_RESTAURANTSBYID_FAILED', payload: error})
    }

}

// get restaurant by ID
export const getRestaurantById =  (id) => async (dispatch) => {
    dispatch({type: 'GET_RESTAURANTBYID_REQUEST'})

    try{
        const response = await authAxios.get(`/restaurants/${id}`)
        dispatch({type: 'GET_RESTAURANTBYID_SUCCESS', payload: response.data})
    }catch(error){
        dispatch({type: 'GET_RESTAURANTBYID_FAILED', payload: error})
    }

}

export const uploadRestaurantImage = (file) => async dispatch => {
    dispatch({ type: 'RESTAURANT_IMAGE_REQUEST' })
    try {
        const response = await axios.post('/restaurants/upload', file)
        dispatch({ type: 'RESTAURANT_IMAGE_SUCCESS', payload: response.data })
        localStorage.setItem('restaurantImage', response.data)
    } catch (error) {
        dispatch({ type: 'RESTAURANT_IMAGE_FAILED', payload: error })
    }
}

export const getRestaurantImage = (filename) => async dispatch => {
    dispatch({ type: 'GET_RESTAURANT_IMAGE_REQUEST' })
    try {
        const response = await axios.get(`/restaurants/image/${filename}`)
        dispatch({ type: 'GET_RESTAURANT_IMAGE_SUCCESS', payload: response.data })
        localStorage.setItem('restaurantImage', response.data)
    } catch (error) {
        dispatch({ type: 'GET_RESTAURANT_IMAGE_FAILED', payload: error })
    }
}

