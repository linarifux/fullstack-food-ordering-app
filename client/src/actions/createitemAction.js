import axios from "axios";

const authAxios = axios.create({
    headers: {
        Authorization: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser'))._id : ''
        // Authorization: JSON.parse(localStorage.getItem('currentUser'))._id?JSON.parse(localStorage.getItem('currentUser'))._id:''
    }
})


export const createItem = (item) => async dispatch => {
    dispatch({ type: 'CREATE_FOOD_REQUEST' })
    try {
        await axios.post('/food/new', item)
        dispatch({ type: 'CREATE_FOOD_SUCCESS' })
    } catch (error) {
        dispatch({ type: 'CREATE_FOOD_FAILED', payload: error })
    }
}

export const getAllItemsById = (id) => async (dispatch) => {
    dispatch({ type: 'GET_ITEMS_REQUEST' })

    try {
        const response = await axios.get(`/food/all/${id}`)
        dispatch({ type: 'GET_ITEMS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_ITEMS_FAILED', payload: error })
    }

}

export const getOneItemById = (id) => async (dispatch) => {
    dispatch({ type: 'GET_ONEITEM_REQUEST' })

    try {
        const response = await axios.get(`/food/${id}`)
        dispatch({ type: 'GET_ONEITEM_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_ONEITEM_FAILED', payload: error })
    }

}

export const getAllItems = () => async (dispatch) => {
    dispatch({ type: 'GET_ALLITEMS_REQUEST' })

    try {
        const response = await axios.get(`/food/all/`)
        dispatch({ type: 'GET_ALLITEMS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_ALLITEMS_FAILED', payload: error })
    }
}

export const deleteItemById = (id) => async dispatch => {
    const response = await authAxios.delete(`/food/delete/${id}`)
    dispatch({ type: 'DELETE_ITEM_SUCCESS', payload: response.data })
}
