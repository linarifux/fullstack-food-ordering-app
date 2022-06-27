export const postRestaurantReducer = (state = { }, action) => {
    switch (action.type) {
        case 'RESTAURANT_POST_REQUEST':
            return {
                loading: true
            }
        case 'RESTAURANT_POST_SUCCESS':
            return {
                loading: false,
                success: true,
                error: false
            }
        case 'RESTAURANT_POST_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

/// get all restaurants
export const getAllRestaurantsReducer = (state={restaurants: []}, action) => {
    switch(action.type){
        case 'GET_RESTAURANTS_REQUEST':
            return{
                loading: true,
                ...state
            }
        case 'GET_RESTAURANTS_SUCCESS':
            return{
                loading: false,
                restaurants: action.payload
            }
        case 'GET_RESTAURANTS_FAILED':
            return{
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

// get all restaurants by Owner Reducer

export const getAllRestaurantsByIdReducer = (state={restaurants: []}, action) => {
    switch(action.type){
        case 'GET_RESTAURANTSBYID_REQUEST':
            return{
                loading: true,
                ...state
            }
        case 'GET_RESTAURANTSBYID_SUCCESS':
            return{
                loading: false,
                restaurants: action.payload
            }
        case 'GET_RESTAURANTSBYID_FAILED':
            return{
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

// get a restaurant by ID

export const getRestaurantByIdReducer = (state={restaurant:{} }, action) => {
    switch(action.type){
        case 'GET_RESTAURANTBYID_REQUEST':
            return{
                loading: true,
                ...state
            }
        case 'GET_RESTAURANTBYID_SUCCESS':
            return{
                loading: false,
                restaurant: action.payload
            }
        case 'GET_RESTAURANTBYID_FAILED':
            return{
                loading: false,
                error: action.payload
            }
        default: return state
    }

}


export const restaurantImageReducer = (state = {}, action) => {
    switch (action.type) {
        case 'RESTAURANT_IMAGE_REQUEST':
            return {
                loading: true
            }
        case 'RESTAURANT_IMAGE_SUCCESS':
            return {
                ...state,
                loading: false,
                success: true,
                imageUrl: action.payload
            }
        case 'RESTAURANT_IMAGE_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}