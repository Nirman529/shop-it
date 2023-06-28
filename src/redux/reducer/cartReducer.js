import { GET_CART_ITEMS } from '../type/cart.js';


const initialState = {
    count: 0,
    products: [],
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_ITEMS: {

            return { ...state, products: action.payload };
        }

        default:
            return state;
    }
}

export default cartReducer;