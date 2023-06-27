import axios from "axios"
import Auth from "../../Auth"
import MyStore from "../store/MyStore"
import apiLink from "../../apiLink"

export const setProducts = () => {
    return async (dispatch) => {
        await axios.get(`${apiLink}/product/get`, Auth)
            .then((response) => {
                dispatch({ type: "SET_PRODUCTS", payload: response.data.data })
            })
            .catch((error) => {
                console.log('error in fetch products', error)
            })
    }
}

export const addProducts = (products) => {
    return {
        type: "ADD_PRODUCTS",
        payload: products
    }
}