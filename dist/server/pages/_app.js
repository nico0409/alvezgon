(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 8484:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MyApp)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5567);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3590);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8819);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4642);
/* harmony import */ var _api_token__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3673);
/* harmony import */ var _context_CartContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4426);
/* harmony import */ var _api_cart__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9532);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_3__, _api_cart__WEBPACK_IMPORTED_MODULE_9__]);
([react_toastify__WEBPACK_IMPORTED_MODULE_3__, _api_cart__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);














function MyApp({ Component , pageProps  }) {
    const { 0: auth , 1: setAuth  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const { 0: reloadUser , 1: setReloadUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: totalProductsCart , 1: setTotalProductsCart  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: reloadCart , 1: seTreloadCart  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const token = (0,_api_token__WEBPACK_IMPORTED_MODULE_7__/* .getToken */ .LP)();
        if (token) {
            const decoded = jwt_decode__WEBPACK_IMPORTED_MODULE_2___default()(token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                setAuth(null);
                react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error("tu session ha expirado");
                (0,_api_token__WEBPACK_IMPORTED_MODULE_7__/* .removeToken */ .gy)();
            } else {
                setAuth({
                    token,
                    idUser: jwt_decode__WEBPACK_IMPORTED_MODULE_2___default()(token)._id
                });
            }
        } else {
            setAuth(null);
        }
        setReloadUser(false);
    }, [
        reloadUser
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setTotalProductsCart((0,_api_cart__WEBPACK_IMPORTED_MODULE_9__/* .countProductsCart */ .vQ)());
        seTreloadCart(false);
    }, [
        reloadCart,
        auth
    ]);
    const login = (token)=>{
        (0,_api_token__WEBPACK_IMPORTED_MODULE_7__/* .setToken */ .o4)(token);
        setAuth({
            token,
            idUser: jwt_decode__WEBPACK_IMPORTED_MODULE_2___default()(token)._id
        });
    };
    const logout = ()=>{
        if (auth) {
            (0,_api_token__WEBPACK_IMPORTED_MODULE_7__/* .removeToken */ .gy)();
            setAuth(null);
            router.push("/");
        }
    };
    const addProduct = (product)=>{
        const token = (0,_api_token__WEBPACK_IMPORTED_MODULE_7__/* .getToken */ .LP)();
        if (token) {
            (0,_api_cart__WEBPACK_IMPORTED_MODULE_9__/* .addProductCart */ .ec)(product);
            seTreloadCart(true);
        } else {
            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error("Debes iniciar sesion para agregar un producto");
        }
    };
    const authData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            auth,
            login,
            logout,
            setReloadUser
        })
    , [
        auth
    ]);
    const removeProduct = (product)=>{
        (0,_api_cart__WEBPACK_IMPORTED_MODULE_9__/* .removeProductCart */ .Vq)(product);
        seTreloadCart(true);
    };
    const cartData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            productsCart: totalProductsCart,
            addProductCart: (product)=>addProduct(product)
            ,
            getProductsCart: _api_cart__WEBPACK_IMPORTED_MODULE_9__/* .getProductsCart */ .rV,
            removeProductCart: (product)=>removeProduct(product)
            ,
            removeAllProductsCart: _api_cart__WEBPACK_IMPORTED_MODULE_9__/* .removeAllProductsCart */ .ob
        })
    , [
        totalProductsCart
    ]);
    if (auth === undefined) return null;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_context_AuthContext__WEBPACK_IMPORTED_MODULE_6__/* ["default"].Provider */ .Z.Provider, {
        value: authData,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_context_CartContext__WEBPACK_IMPORTED_MODULE_8__/* ["default"].Provider */ .Z.Provider, {
            value: cartData,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                    ...pageProps
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_toastify__WEBPACK_IMPORTED_MODULE_3__.ToastContainer, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    newestOnTop: true,
                    closeOnClick: true,
                    rtl: false,
                    pauseOnFocusLoss: false,
                    draggable: true,
                    pauseOnHover: true
                })
            ]
        })
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8819:
/***/ (() => {



/***/ }),

/***/ 5567:
/***/ ((module) => {

"use strict";
module.exports = require("jwt-decode");

/***/ }),

/***/ 6517:
/***/ ((module) => {

"use strict";
module.exports = require("lodash");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 3590:
/***/ ((module) => {

"use strict";
module.exports = import("react-toastify");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [129,532], () => (__webpack_exec__(8484)));
module.exports = __webpack_exports__;

})();