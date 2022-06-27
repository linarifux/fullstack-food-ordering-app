export const postFoodRequestReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FOOD_POST_REQUEST':
            return {
                loading: true
            }
        case 'FOOD_POST_SUCCESS':
            return {
                loading: false,
                success: true
            }
        case 'FOOD_POST_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const getAllRequestsByIdReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case 'GET_REQUESTS_REQUEST':
            return {
                loading: true,
                ...state
            }
        case 'GET_REQUESTS_SUCCESS':
            return {
                loading: false,
                requests: action.payload
            }
        case 'GET_REQUESTS_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const getAllRequestsReducer = (state = { reqs: [] }, action) => {
    switch (action.type) {
        case 'GET_ALL_REQUESTS_REQUEST':
            return {
                load: true,
                ...state
            }
        case 'GET_ALL_REQUESTS_SUCCESS':
            return {
                load: false,
                reqs: action.payload
            }
        case 'GET_ALL_REQUESTS_FAILED':
            return {
                load: false,
                e: action.payload
            }
        case 'DELETE_FOOD_SUCCESS':
            return {
                ...state,
                reqs: state.reqs.filter(food => food._id !== action.payload._id)
            }

        default: return state
    }

}


/// get one request reducer

export const getRequestByIdReducer = (state = { foodRequest: {} }, action) => {
    switch (action.type) {
        case 'GET_REQUESTBYID_CLEAR':
            return {
                load: true,
                foodRequest: ''
            }
        case 'GET_REQUESTBYID_REQUEST':
            return {
                load: true,
                ...state
            }
        case 'GET_REQUESTBYID_SUCCESS':
            return {
                load: false,
                foodRequest: action.payload
            }
        case 'GET_REQUESTBYID_FAILED':
            return {
                load: false,
                e: action.payload
            }

        default: return state
    }

}

/// update Food request by ID

export const updateRequestByIdReducer = (state = { request: {} }, action) => {
    switch (action.type) {
        case 'GET_UPDATEBYIDREQUEST_REQUEST':
            return {
                load: true,
                ...state
            }
        case 'GET_UPDATEBYIDREQUEST_SUCCESS':
            return {
                load: false,
                request: action.payload
            }
        case 'GET_UPDATEBYIDREQUEST_FAILED':
            return {
                load: false,
                e: action.payload
            }

        default: return state
    }

}



export const postFoodRequestImageReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FOOD_IMAGE_REQUEST':
            return {
                loading: true
            }
        case 'FOOD_IMAGE_SUCCESS':
            return {
                ...state,
                loading: false,
                success: true,
                imageUrl: action.payload
            }
        case 'FOOD_IMAGE_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

