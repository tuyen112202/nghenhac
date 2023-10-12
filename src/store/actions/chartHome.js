import actionTypes from "./actionTypes";
import * as apis from "~/apis" 
//dispatch from redux-thunk
export const getChart = () => async (dispatch) => {
    try {
        const response = await apis.getChart();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CHART,
                chartData: response?.data?.data,
            })
        }
        else {
            dispatch({
                type: actionTypes.GET_CHART,
                chartData: null
            })
        }
    }
    catch {
        dispatch({
            type: actionTypes.GET_CHART,
            chartData: null
        })
    }
}