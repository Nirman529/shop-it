import { GET_COMPLETED_ORDERS } from "../type/completedOrders";

const initialState = {
    completedOrders: []
}

const completedOrdersReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMPLETED_ORDERS: {
            return {...state, completedOrders: action.payload}
        }
        default: {
            return state
        }
    }
}

export default completedOrdersReducers;