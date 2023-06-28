import axios from "axios"
import Auth from "../../Auth"
import apiLink from "../../apiLink"

export const getOrders = () => {
    return async (dispatch) => {
        await axios.get(`${apiLink}/order/get`, Auth)
            .then((response) => {
                dispatch({ type: "GET_ORDERS", payload: response.data.data })
            }).catch((error) => {
                console.log('error in getOrders', error)
            })
    }
}

export const addOrders = (obj) => {
    return async (dispatch) => {
        await axios.post(`${apiLink}/order/add`, {productId: obj.ID, quantity: obj.quantity} ,Auth)
            .then((response) => {
                console.log('response in add orders', response)
                dispatch(getOrders())
            }).catch((error) => {
                console.log('error in getOrders', error)
            })
    }
}

export const deleteOrders = (ID) => {
    return async (dispatch) => {
        await axios.delete(`${apiLink}/order/remove?productId=${ID}`, Auth)
            .then(() => {
                dispatch(getOrders())
            }).catch((error) => {
                console.log('error in getOrders', error)
            })
    }
}