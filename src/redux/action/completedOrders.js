import axios from "axios"
import Auth from "../../Auth"
import apiLink from "../../apiLink"
import { setLoader } from "../../Services/LoaderService"


export const getCompletedOrders = () => {
    return async (dispatch) => {
        await axios.get(`${apiLink}/orderCompleted/get`, Auth)
            .then((response) => {
                dispatch({ type: "GET_COMPLETED_ORDERS", payload: response.data.data })
            })
            .then(() => {
                setLoader(false)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }
}
