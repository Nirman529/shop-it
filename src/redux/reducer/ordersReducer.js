import { GET_ORDERS } from "../type/orders";

const initialState = {
    orders: []
}

const ordersReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS: {
            return { ...state, orders: action.payload }
        }
        default: {
            return state
        }
    }
}

export default ordersReducers; 