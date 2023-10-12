import actionTypes from "./actionTypes";

export const setCurSongId = (songId) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    songId: songId,
})

export const setPlay = (flag) => ({
    type: actionTypes.PLAY,
    flag
})

export const setPlaylist = (songs) => ({
    type: actionTypes.SET_PLAYLIST,
    songs
})

export const setFocusSearch = (flag) => ({
    type: actionTypes.SET_FOCUS_SEARCH,
    flag
})