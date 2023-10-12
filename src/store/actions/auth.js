import actionTypes from './actionTypes';
// Thực hiện action khi đăng nhập thành công
export const loginSuccess = (user) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: user,
});

// Thực hiện action khi đăng xuất thành công
export const logoutSuccess = () => ({
    type: actionTypes.LOGOUT_SUCCESS,
});
