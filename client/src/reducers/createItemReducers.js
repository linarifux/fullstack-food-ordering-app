export const createItemReducer = (state = { }, action) => {
    switch (action.type) {
        case 'CREATE_FOOD_REQUEST':
            return {
                loading: true
            }
        case 'CREATE_FOOD_SUCCESS':
            return {
                loading: false,
                success: true
            }
        case 'CREATE_FOOD_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const getAllItemsByIdReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case 'GET_ITEMS_REQUEST':
            return {
                loading: true,
                ...state
            }
        case 'GET_ITEMS_SUCCESS':
            return {
                loading: false,
                items: action.payload
            }
        case 'GET_ITEMS_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

// Get All Items

export const getAllItemsReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case 'GET_ALLITEMS_REQUEST':
            return {
                loading: true,
                ...state
            }
        case 'GET_ALLITEMS_SUCCESS':
            return {
                loading: false,
                items: action.payload
            }
        case 'GET_ALLITEMS_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

// Get One Item by ID

export const getOneItemByIdReducer = (state = { }, action) => {
    switch (action.type) {
        case 'GET_ONEITEM_REQUEST':
            return {
                loading: true,
                ...state
            }
        case 'GET_ONEITEM_SUCCESS':
            return {
                loading: false,
                item: action.payload
            }
        case 'GET_ONEITEM_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }

}