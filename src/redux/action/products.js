import axios from "axios"
import Auth from "../../Auth"
import MyStore from "../store/MyStore"
import apiLink from "../../apiLink"
import { SET_PRODUCTS } from "../type/products"

// const fetchUser = async () => {
//     const response = await axios
//         .get(`${apiLink}/user/getUser`, Auth)
//         .catch((err) => {
//             console.log('err get user api\n', err)
//         });
//     dispatch(setUser(response.data.data))
//     // console.log('response', response)
// }



export const fetchProducts = () => {

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
// export const fetchProducts = () => {
//     axios.get(`${apiLink}/product/get`, Auth)
//         .then((response) => {
//             console.log('api success then response.data.data', response.data.data)
//             // json = JSON.stringify(response.data.data)
//             setProducts(response.data)
//         })
//         .then((response) => {
//             console.log('response 2 in fetch product', response)
//         })
//         .catch((error) => {
//             console.log('error inside setProducts', error)
//         })
// }

export const setProducts = () => {
    console.log('MyStore.get', MyStore.getState())
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