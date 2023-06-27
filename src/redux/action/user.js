import axios from "axios";
import Auth from "../../Auth";
import apiLink from "../../apiLink";
import MyStore from "../store/MyStore.js"


export const fetchUser = () => {
    return async (dispatch) => {
        await axios.get(`${apiLink}/user/getUser`, Auth)
            .then((response) => {
                dispatch({ type: "SET_USER", payload: response.data.data })
            })
            .then(() => {
                console.log('MyStore.getState() in get user', MyStore.getState())
            })
            .catch((err) => {
                console.log('err get user api\n', err)
            });
    }
}
