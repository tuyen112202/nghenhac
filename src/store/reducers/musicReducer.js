import actionTypes from '../actions/actionTypes';

const initState = {
    currentSongId: null,
    isPlaying: false,
    atPlaylist: false,
    songs: null,
    isSearching: false,
};

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                currentSongId: action.songId || null,
            };
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag,
            };
        case actionTypes.SET_FOCUS_SEARCH:
            return {
                ...state,
                isSearching: action.flag,
            };
        case actionTypes.SET_PLAYLIST:
            return {
                ...state,
                songs: action.songs || null,
            };
        default:
            return state;
    }
};

export default musicReducer;
