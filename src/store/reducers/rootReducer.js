import appReducer from "./appReducer";
import musicReducer from "./musicReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
    key: 'root',
    whitelist: ['isLogin', 'userData', 'artist']
}

const musicConfig = {
    ...commonConfig,
    key: 'music',
    whitelist: ['currentSongId']
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['currentUser']
}

const rootReducer = combineReducers({
    app: persistReducer(commonConfig ,appReducer),
    curMusic: persistReducer(musicConfig, musicReducer),
    auth: persistReducer(authConfig ,authReducer),
})

export default rootReducer;
