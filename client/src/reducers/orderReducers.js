export const createNewOrderReducer = (state = { }, action) => {
    switch (action.type) {
        case 'CREATE_ORDER_REQUEST':
            return {
                loading: true
            }
        case 'CREATE_ORDER_SUCCESS':
            return {
                loading: false,
                success: true,
                error: false
            }
        case 'CREATE_ORDER_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}


export const getAllOrdersByIdReducer = (state = {orders: [] }, action) => {
    switch (action.type) {
        case 'GET_ALLORDERS_REQUEST':
            return {
                loading: true
            }
        case 'GET_ALLORDERS_SUCCESS':
            return {
                loading: false,
                orders: action.payload
            }
        case 'GET_ALLORDERS_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}


export const getOneOrderByIdReducer = (state = { }, action) => {
    switch (action.type) {
        case 'GET_ORDERBYID_REQUEST':
            return {
                loading: true
            }
        case 'GET_ORDERBYID_SUCCESS':
            return {
                loading: false,
                order: action.payload
            }
        case 'GET_ORDERBYID_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}


