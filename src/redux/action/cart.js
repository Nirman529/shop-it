export const getCartItems = (cart) => {
    return {
        type: "GET_CART_ITEMS",
        payload: cart
    }
}

export const addToCart = (cart) => {
    return {
        type: "ADD_TO_CART",
        payload: cart
    }
}

export const decreaseQuantity = (cart) => {
    return {
        type: "DECREASE_QUANTITY",
        payload: cart
    }
}

export const increaseQuantity = (cart) => {
    return {
        type: "INCREASE_QUANTITY",
        payload: cart
    }
}

export const deleteFromCart = (cart) => {
    return {
        type: "DELETE_FROM_CART",
        payload: cart
    }
}

export const getCartCount = (cart) => {
    return {
        type: "GET_CART_COUNT",
        payload: cart
    }
}