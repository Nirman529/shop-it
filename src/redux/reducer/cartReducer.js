import { ADD_TO_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, DELETE_FROM_CART, GET_CART_ITEMS } from '../type/cart.js';


const initialState = {
    count: 0,
    currCart: [],
    products: [],
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            // Chance of error
            if (state.count === 0) {
                let _cart = {
                    id: action.payload.id,
                    quantity: 1,
                    productName: action.payload.productName,
                    productImage: action.payload.productImage,
                    price: action.payload.price
                }
                state.currCart.push(_cart);
            } else {
                let check = false;
                state.currCart.map((item, key) => {
                    if (item.id === action.payload.id) {
                        state.currCart[key].quantity++;
                        check = true;
                    }
                });
                if (!check) {
                    let _cart = {
                        id: action.payload.id,
                        quantity: 1,
                        productName: action.payload.productName,
                        productImage: action.payload.productImage,
                        price: action.payload.price
                    }
                    state.currCart.push(_cart)
                }
            }

            return { ...state, count: state.count + 1 };
        }

        case INCREASE_QUANTITY: {
            state.count++
            state.currCart[action.payload].quantityInCart++;

            return { ...state };
        }

        case DECREASE_QUANTITY: {

            let quantityInCart = state.currCart[action.payload].quantityInCart;

            if (quantityInCart > 1) {
                state.count--;
                state.currCart[action.payload].quantityInCart--;
            }

            return { ...state };
        }

        case DELETE_FROM_CART: {
            let quantityInCart = state.currCart[action.payload].quantityInCart;
            return {
                ...state,
                count: state.count - quantityInCart,
                cart: state.currCart.filter(items => {
                    return items.id !== state.currCart[action.payload].id
                })
            };
        }

        case GET_CART_ITEMS: {

            return { ...state, products: action.payload };
        }

        default:
            return state;

    }
}

export default cartReducer;