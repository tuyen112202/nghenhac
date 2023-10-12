import actionTypes from '../actions/actionTypes';

const initState = {
    banner: [],
    newRelease: [],
    playlists: [],
    chart: {},
    topSongs: [],
    chartHome: {},
    artist: {},
    top100: {},
    isLogin: false,
    isSignUpContent: false,
    user: {},
    userData: {},
    isMenuShow: false,
    isLoading: true,
    isSearchLoading: true
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find((item) => item.sectionType === 'banner').items || null,
                newRelease: action.homeData?.find((item) => item.sectionType === 'new-release').items.all || null,
                playlists: action.homeData?.filter((item) => item && item.sectionType === 'playlist') || null,
                chart: action.homeData?.find((item) => item && item.sectionId === 'hZC').chart || null,
                topSongs: action.homeData?.find((item) => item && item.sectionId === 'hZC').items || null,
            };
        case actionTypes.GET_CHART:
            return {
                ...state,
                chartHome: action?.chartData || null,
            };
        case actionTypes.GET_ARTIST:
            return {
                ...state,
                artist: action?.artist || null,
            };
        case actionTypes.GET_TOP100:
            return {
                ...state,
                top100: action?.top100Data || null,
            };
        case actionTypes.LOGIN:
            return {
                ...state,
                isLogin: action?.flag,
            };
        case actionTypes.SET_SIGN_UP:
            return {
                ...state,
                isSignUpContent: action?.flag,
            };
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action?.user,
            };
        case actionTypes.SET_USER_DATA:
            return {
                ...state,
                userData: action?.userData,
            };
        case actionTypes.SET_MENU_SHOW:
            return {
                ...state,
                isMenuShow: action?.flag,
            };
        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action?.flag,
            };
        case actionTypes.SET_SEARCH_LOADING:
            return {
                ...state,
                isSearchLoading: action?.flag,
            };
        default:
            return state;
    }
};

export default appReducer;
