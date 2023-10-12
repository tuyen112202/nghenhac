import actionTypes from "./actionTypes";
import * as apis from "~/apis" 
//dispatch from redux-thunk
export const getDiscover = () => async (dispatch) => {
    try {
        const response = await apis.getDiscover();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_HOME,
                homeData: response.data.data.items,
            })
        }
        else {
            dispatch({
                type: actionTypes.GET_HOME,
                homeData: null
            })
        }
    }
    catch {
        dispatch({
            type: actionTypes.GET_HOME,
            homeData: null
        })
    }
}