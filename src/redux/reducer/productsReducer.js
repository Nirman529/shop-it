import { ADD_PRODUCTS, SET_PRODUCTS } from "../type/products.js";

const initialState = {
    products: [],
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: {
            // api call for getting products
            return { ...state, products: action.payload };
        }
        case ADD_PRODUCTS: {

            return {};
        }
        default:
            return state;
    }
}

export default productsReducer;