export const addToCart = (item, quantity, variant, restaurant, restaurantName) => async (dispatch, getState) => {

    const tVariant = item.variants && item.variants.find(target => target.name === variant)

    let cartItem = {
        title: item.title,
        _id: item._id,
        image: item.image,
        variant,
        quantity,
        restaurant,
        restaurantName,
        price: tVariant ? tVariant.price : item.price,
        total: tVariant ? tVariant.price * quantity : item.price * quantity
    }

    dispatch({ type: 'ADD_TO_CART', payload: cartItem })

    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}


export const deleteFromCart = (pizza) => (dispatch, getState) => {
    dispatch({ type: 'DELETE_FROM_CART', payload: pizza })
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const emptyCart = () => (dispatch) => {
    dispatch({ type: 'DELETE_ALL_FROM_CART'})
}
