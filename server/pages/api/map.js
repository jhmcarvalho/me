"use strict";
(() => {
var exports = {};
exports.id = 131;
exports.ids = [131];
exports.modules = {

/***/ 8004:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const handler = async (req, res1)=>{
    const response = await fetch(`https://cafe.jeffs.me/_activity/map${req.query.dark != undefined ? "?dark" : "?light"}`).then((res)=>res.json()
    );
    res1.status(200).json(response);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8004));
module.exports = __webpack_exports__;

})();