export const cartReducer = (state={cartItems: []}, action) => {

    switch(action.type){
        case 'ADD_TO_CART':
            const existed = state.cartItems.find(item => item._id === action.payload._id)
            if(existed){
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item._id === action.payload._id ? action.payload : item)
                }
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload]
                }
            }
        
        case 'DELETE_FROM_CART':
            return{
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== action.payload._id)
            }
        case 'DELETE_ALL_FROM_CART':
            return{
                ...state,
                cartItems: []
            }
            
        default: return state
    }

}