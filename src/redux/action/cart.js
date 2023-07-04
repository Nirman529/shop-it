import axios from "axios"
import Auth from "../../Auth";
import MyStore from '../store/MyStore';
import apiLink from "../../apiLink";
import { setLoader } from "../../Services/LoaderService";

export const getCartItems = () => {
    return async (dispatch) => {
        await axios.get(`${apiLink}/addtocart/get`, Auth)
            .then((response) => {
                dispatch({ type: "GET_CART_ITEMS", payload: response.data.data })
            })
            .then(() => {
                setLoader(false)
            })
            .catch((error) => {
                console.log('error in get cart items', error)
            })
    }
}

export const addToCart = (obj) => {
    return async (dispatch) => {
        await axios.post(`${apiLink}/addtocart/add`,{productId: obj._id}, Auth)
            .then((response) => {
                if (response.isSuccess) {
                    dispatch(getCartItems())
                }
            })
            .catch((error) => {
                console.log('error in add to cart', error)
            })
    }
}

export const deleteFromCart = (id) => {
    return async (dispatch) => {
        await axios.delete(`${apiLink}/addtocart/remove?productId=${id}`, Auth)
            .then(() => {
                dispatch(getCartItems())
            })
            .catch((error) => {
                console.log('error', error)
            })
    }
}

export const getCartCount = (cart) => {
    return {
        type: "GET_CART_COUNT",
        payload: cart
    }
}