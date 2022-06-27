import axios from "axios"

export const registerUser = (user) => async dispatch => {
    dispatch({type: 'USER_REGISTER_REQUEST'})
    try{
       await axios.post('/users/register', user)
       dispatch({type: 'USER_REGISTER_SUCCESS'})
    }catch(error){
        dispatch({type: 'USER_REGISTER_FAILED', payload: error})
    }
}


export const loginUser = (user) => async dispatch => {
    dispatch({type: 'USER_LOGIN_REQUEST'})
    try{
        const response = await axios.post('/users/login', user)
        dispatch({type: 'USER_LOGIN_SUCCESS', payload: response.data})
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        window.location.href = '/'
    }catch(error){
        dispatch({type: 'USER_LOGIN_FAILED', payload: error})
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('currentUser')
    window.location.href = '/login'
}

// update user by ID

export const updateUserById = (id, data) => async dispatch => {
    dispatch({type: 'USER_UPDATE_REQUEST'})
    try{
        const response = await axios.put(`/users/update/${id}`, data)
       dispatch({type: 'USER_UPDATE_SUCCESS', payload: response.data})
    }catch(error){
        dispatch({type: 'USER_UPDATE_FAILED', payload: error})
    }
}

// get user by ID

export const getUserById = (id) => async dispatch => {
    dispatch({type: 'GET_USER_REQUEST'})
    try{
        const response = await axios.get(`/users/user/${id}`)
       dispatch({type: 'GET_USER_SUCCESS', payload: response.data})
    }catch(error){
        dispatch({type: 'GET_USER_FAILED', payload: error})
    }
}


// get user whoose type is delivery man

export const getUsersByType = (type) => async dispatch => {
    dispatch({type: 'GET_USERS_BY_TYPE_REQUEST'})
    try{
        const response = await axios.get(`/users/${type}`)
       dispatch({type: 'GET_USERS_BY_TYPE_SUCCESS', payload: response.data})
    }catch(error){
        dispatch({type: 'GET_USERS_BY_TYPE_FAILED', payload: error})
    }
}



export const locateUser = (userLocation) => async dispatch => {
    dispatch({type: 'USER_LOCATE_REQUEST'})
    try{
       dispatch({type: 'USER_LOCATE_SUCCESS', payload: userLocation})
    }catch(error){
        dispatch({type: 'USER_LOCATE_FAILED', payload: error})
    }
}