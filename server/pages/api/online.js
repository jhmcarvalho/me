"use strict";
(() => {
var exports = {};
exports.id = 725;
exports.ids = [725];
exports.modules = {

/***/ 1775:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const handler = async (req, res1)=>{
    const response = await fetch(`https://api.lanyard.rest/v1/users/465094881908621313`).then((res)=>res.json()
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
var __webpack_exports__ = (__webpack_exec__(1775));
module.exports = __webpack_exports__;

})();