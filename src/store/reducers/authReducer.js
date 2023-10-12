import actionTypes from '../actions/actionTypes';
const initialState = {
    currentUser: null,
    isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true,
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer;
