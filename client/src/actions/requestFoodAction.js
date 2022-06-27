import axios from "axios"

const authAxios = axios.create({
    headers: {
        Authorization: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser'))._id : ''
        // Authorization: JSON.parse(localStorage.getItem('currentUser'))._id?JSON.parse(localStorage.getItem('currentUser'))._id:''
    }
})

export const postRequest = (food) => async dispatch => {
    dispatch({ type: 'FOOD_POST_REQUEST' })
    try {
        await axios.post('/requests/new', food)
        dispatch({ type: 'FOOD_POST_SUCCESS' })
    } catch (error) {
        dispatch({ type: 'FOOD_POST_FAILED', payload: error })
    }
}

export const getAllRequestsById = () => async (dispatch) => {
    dispatch({ type: 'GET_REQUESTS_REQUEST' })
    try {
        const response = await authAxios.get('/requests/all')
        dispatch({ type: 'GET_REQUESTBYID_CLEAR' })
        dispatch({ type: 'GET_REQUESTS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_REQUESTS_FAILED', payload: error })
    }

}

export const getAllRequests = () => async (dispatch) => {
    dispatch({ type: 'GET_ALL_REQUESTS_REQUEST' })
    try {
        const response = await axios.get('/requests/allrequests')
        dispatch({ type: 'GET_ALL_REQUESTS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_ALL_REQUESTS_FAILED', payload: error })
    }

}

export const getRequestById = (id) => async (dispatch) => {
    dispatch({ type: 'GET_REQUESTBYID_REQUEST' })
    try {
        const response = await axios.get(`/requests/${id}`)
        dispatch({ type: 'GET_REQUESTBYID_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_REQUESTBYID_FAILED', payload: error })
    }
}

// update a request by ID
export const updateRequestById = (id, data) => async (dispatch) => {
    dispatch({ type: 'GET_UPDATEBYIDREQUEST_REQUEST' })
    try {
        const response = await axios.put(`/requests/${id}`, data)
        dispatch({ type: 'GET_UPDATEBYIDREQUEST_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_UPDATEBYIDREQUEST_FAILED', payload: error })
    }

}


export const uploadRequestImage = (file) => async dispatch => {
    dispatch({ type: 'FOOD_IMAGE_REQUEST' })
    try {
        const response = await axios.post('/requests/upload', file)
        dispatch({ type: 'FOOD_IMAGE_SUCCESS', payload: response.data })
        localStorage.setItem('requestImage', response.data)
    } catch (error) {
        dispatch({ type: 'FOOD_IMAGE_FAILED', payload: error })
    }
}

export const getRequestImage = (filename) => async dispatch => {
    dispatch({ type: 'GET_FOOD_IMAGE_REQUEST' })
    try {
        const response = await axios.get(`/requests/image/${filename}`)
        dispatch({ type: 'GET_FOOD_IMAGE_SUCCESS', payload: response.data })
        localStorage.setItem('requestImage', response.data)
    } catch (error) {
        dispatch({ type: 'GET_FOOD_IMAGE_FAILED', payload: error })
    }
}

export const deleteFoodRequest = (id) => async dispatch => {
    const response = await authAxios.delete(`/requests/delete/${id}`)
    dispatch({ type: 'DELETE_FOOD_SUCCESS', payload: response.data })
}