import axios from 'axios'

export const createNewOrder = (order) => async dispatch => {
    dispatch({ type: 'CREATE_ORDER_REQUEST' })
    try {
        await axios.post('/orders/new', order)
        dispatch({type: 'CREATE_ORDER_SUCCESS'})
    } catch (e) {
        dispatch({type: "CREATE_ORDER_FAIL", payload: e})
    }
}

export const getAllCustomersOrdersById = (id) => async dispatch => {
    dispatch({ type: 'GET_ALLORDERS_REQUEST' })
    try {
        const response = await axios.get(`/orders/customers/${id}`)
        dispatch({type: 'GET_ALLORDERS_SUCCESS', payload: response.data})
    } catch (e) {
        dispatch({type: "GET_ALLORDERS_FAIL", payload: e})
    }
}

export const getAllRestaurantsOrdersById = (id) => async dispatch => {
    dispatch({ type: 'GET_ALLORDERS_REQUEST' })
    try {
        const response = await axios.get(`/orders/all/restaurants/${id}`)
        dispatch({type: 'GET_ALLORDERS_SUCCESS', payload: response.data})
    } catch (e) {
        dispatch({type: "GET_ALLORDERS_FAIL", payload: e})
    }
}


export const getAllDeliveryMansOrdersById = (id) => async dispatch => {
    dispatch({ type: 'GET_ALLORDERS_REQUEST' })
    try {
        const response = await axios.get(`/orders/all/deliverymans/${id}`)
        dispatch({type: 'GET_ALLORDERS_SUCCESS', payload: response.data})
    } catch (e) {
        dispatch({type: "GET_ALLORDERS_FAIL", payload: e})
    }
}



export const getOneOrderById = (id) => async dispatch => {
    dispatch({ type: 'GET_ORDERBYID_REQUEST' })
    try {
        const response = await axios.get(`/orders/${id}`)
        dispatch({type: 'GET_ORDERBYID_SUCCESS', payload: response.data})
    } catch (e) {
        dispatch({type: "GET_ORDERBYID_FAIL", payload: e})
    }
}


export const updateOneOrderById = (id, data) => async dispatch => {
    try{
        const response = await axios.put(`/orders/update/${id}`, {data})
        console.log(response.data);
    }catch(error){
        dispatch({type: 'ORDER_UPDATE_FAILED', payload: error})
    }
}