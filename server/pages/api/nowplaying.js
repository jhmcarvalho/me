"use strict";
(() => {
var exports = {};
exports.id = 294;
exports.ids = [294];
exports.modules = {

/***/ 2239:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ nowplaying)
});

;// CONCATENATED MODULE: external "spotify-web-api-node"
const external_spotify_web_api_node_namespaceObject = require("spotify-web-api-node");
var external_spotify_web_api_node_default = /*#__PURE__*/__webpack_require__.n(external_spotify_web_api_node_namespaceObject);
;// CONCATENATED MODULE: ./src/pages/api/nowplaying.ts

const api = new (external_spotify_web_api_node_default())({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT
});
const handler = async (req, res)=>{
    try {
        api.setRefreshToken(process.env.SPOTIFY_REFRESH_TOKEN);
        const data = await api.refreshAccessToken();
        api.setAccessToken(data.body["access_token"]);
        const recentTracks = await api.getMyRecentlyPlayedTracks({
            limit: 1
        });
        res.status(200).json(recentTracks.body.items[0].track);
    } catch (err) {
        console.log("Something went wrong!", err);
    }
};
/* harmony default export */ const nowplaying = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2239));
module.exports = __webpack_exports__;

})();