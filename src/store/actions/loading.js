import actionTypes from './actionTypes';

export const setLoading = (flag) => ({
    type: actionTypes.SET_LOADING,
    flag,
});

export const setSearchLoading = (flag) => ({
    type: actionTypes.SET_SEARCH_LOADING,
    flag,
});


