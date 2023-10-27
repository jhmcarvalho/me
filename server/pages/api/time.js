"use strict";
(() => {
var exports = {};
exports.id = 122;
exports.ids = [122];
exports.modules = {

/***/ 9005:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const handler = async (req, res1)=>{
    const response = await fetch(`https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&formatted=0`).then((res)=>res.json()
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
var __webpack_exports__ = (__webpack_exec__(9005));
module.exports = __webpack_exports__;

})();