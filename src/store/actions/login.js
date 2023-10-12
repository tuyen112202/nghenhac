import actionTypes from "./actionTypes";
export const setLogin = (flag) => ({
    type: actionTypes.LOGIN,
    flag
})

export const setSignUp = (flag) => ({
    type: actionTypes.SET_SIGN_UP,
    flag
})

export const setUser = (user) => ({
    type: actionTypes.SET_USER,
    user
})

export const setUserData = (userData) => ({
    type: actionTypes.SET_USER_DATA,
    userData
})
