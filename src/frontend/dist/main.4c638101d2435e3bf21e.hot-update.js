"use strict";
self["webpackHotUpdatefrontend"]("main",{

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "../../node_modules/react-dom/client.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./src/app.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "../../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store/store */ "./src/store/store.ts");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/styles/ThemeProvider.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/CssBaseline/CssBaseline.js");
/* harmony import */ var _styles_theme_mui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/theme-mui */ "./src/styles/theme-mui.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ../../node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "../../node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../node_modules/react-refresh/runtime.js */ "../../node_modules/react-refresh/runtime.js");

// src/frontend/src/index.tsx


 // Ensure the path is correct






// Render the App component
var rootElement = document.getElementById('root');
var root;
if (rootElement) {
  root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(rootElement);
  root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_redux__WEBPACK_IMPORTED_MODULE_5__.Provider, {
    store: _store_store__WEBPACK_IMPORTED_MODULE_3__["default"]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    theme: _styles_theme_mui__WEBPACK_IMPORTED_MODULE_4__["default"]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_app__WEBPACK_IMPORTED_MODULE_2__["default"], null))))));
} else {
  throw new Error('Root element not found');
}

// Enable Hot Module Replacement (HMR)
if (true) {
  module.hot.accept(/*! ./app */ "./src/app.tsx", __WEBPACK_OUTDATED_DEPENDENCIES__ => { /* harmony import */ _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./src/app.tsx");
(function () {
    // Dynamically import the updated App component
    Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./app */ "./src/app.tsx")).then(function (_ref) {
      var NextApp = _ref["default"];
      if (root) {
        root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_redux__WEBPACK_IMPORTED_MODULE_5__.Provider, {
          store: _store_store__WEBPACK_IMPORTED_MODULE_3__["default"]
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
          theme: _styles_theme_mui__WEBPACK_IMPORTED_MODULE_4__["default"]
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NextApp, null))))));
      }
    })["catch"](function (err) {
      console.error('Failed to load App module:', err);
    });
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}
console.log('Frontend app loaded successfully.');

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (typeof __react_refresh_error_overlay__ !== 'undefined') {
			errorOverlay = __react_refresh_error_overlay__;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f182fe61a4db8eb3be40")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.4c638101d2435e3bf21e.hot-update.js.map