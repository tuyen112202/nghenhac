import actionTypes from "./actionTypes";
import * as apis from "~/apis" 
//dispatch from redux-thunk
export const getTop100 = () => async (dispatch) => {
    try {
        const response = await apis.getTop100();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_TOP100,
                top100Data: response?.data,
            })
        }
        else {
            dispatch({
                type: actionTypes.GET_TOP100,
                top100Data: null
            })
        }
    }
    catch {
        dispatch({
            type: actionTypes.GET_TOP100,
            top100Data: null
        })
    }
}