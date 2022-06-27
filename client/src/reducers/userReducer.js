export const registerUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return {
                loading: true
            }
        case 'USER_REGISTER_SUCCESS':
            return {
                loading: false
            }
        case 'USER_REGISTER_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const loginUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return {
                loading: true
            }
        case 'USER_LOGIN_SUCCESS':
            return {
                loading: false,
                success: true,
                currentUser: action.payload
            }
        case 'USER_LOGIN_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

// update user by ID reducer
export const updateUserByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_UPDATE_REQUEST':
            return {
                loading: true
            }
        case 'USER_UPDATE_SUCCESS':
            return {
                loading: false,
                success: true,
                user: action.payload
            }
        case 'USER_UPDATE_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

// get user by id

export const getUserByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_USER_REQUEST':
            return {
                loading: true
            }
        case 'GET_USER_SUCCESS':
            return {
                loading: false,
                success: true,
                user: action.payload
            }
        case 'GET_USER_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}


// get users by type

export const getUsersByTypeReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case 'GET_USERS_BY_TYPE_REQUEST':
            return {
                loading: true
            }
        case 'GET_USERS_BY_TYPE_SUCCESS':
            return {
                loading: false,
                success: true,
                users: action.payload
            }
        case 'GET_USERS_BY_TYPE_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}




export const locateUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOCATE_REQUEST':
            return {
                loading: true
            }
        case 'USER_LOCATE_SUCCESS':
            return {
                loading: false,
                success: true,
                userLocation: action.payload
            }
        case 'USER_LOCATE_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}