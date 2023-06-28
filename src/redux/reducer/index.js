import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import ordersReducer from "./ordersReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
})