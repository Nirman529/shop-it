import axios from "axios"
import Auth from "../../Auth"
import apiLink from "../../apiLink"


export const getCompletedOrders = () => {
    return async (dispatch) => {
        await axios.get(`${apiLink}/orderCompleted/get`, Auth)
            .then((response) => {
                dispatch({ type: "GET_COMPLETED_ORDERS", payload: response.data.data })
            }).catch((error) => {
                console.log('error', error)
            })
    }
}
