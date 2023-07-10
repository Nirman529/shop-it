import axios from "axios";
import Auth from "../../Auth";
import apiLink from "../../apiLink";
import MyStore from "../store/MyStore.js"
import { setLoader } from "../../Services/LoaderService";


export const fetchUser = () => {
    return async (dispatch) => {
        await axios.get(`${apiLink}/user/getUser`, Auth)
            .then((response) => {
                dispatch({ type: "SET_USER", payload: response.data.data })
            })
            .then(() => {
                setLoader(false)
            })
            .catch((err) => {
                console.log('err get user api\n', err)
            });
    }
}
