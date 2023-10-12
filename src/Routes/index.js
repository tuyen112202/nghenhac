import config from "../config";
import Discover from "../pages/public/Discover/Discover"
import ZingChard from "../pages/public/ZingChart/Zingchart"
import Top100 from "~/pages/public/Top100/Top100";
import Library from "../pages/public/Library/Library"
import Playlist from "~/pages/public/Playlist/Playlist";
import Artist from "~/pages/public/Artist";


const publicRoutes = [
    { path: config.routes.discover, component: Discover},
    { path: config.routes.zingchart, component: ZingChard},
    { path: config.routes.library, component: Library},
    { path: config.routes.top100, component: Top100},
    { path: config.routes.playlist_title_id, component: Playlist},
    { path: config.routes.artist, component: Artist},
    { path: config.routes.producer, component: Artist},
]

export {publicRoutes}