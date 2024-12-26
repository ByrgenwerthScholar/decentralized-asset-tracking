"use strict";
self["webpackHotUpdatefrontend"]("main",{

/***/ "./src/demos/legal/demoSteps.ts":
/*!**************************************!*\
  !*** ./src/demos/legal/demoSteps.ts ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   demoSteps: () => (/* binding */ demoSteps)
/* harmony export */ });
/* harmony import */ var _services_fabricService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/fabricService */ "./src/services/fabricService.ts");
/* harmony import */ var _store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/slices/demoSlice */ "./src/store/slices/demoSlice.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ../../node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "../../node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../node_modules/react-refresh/runtime.js */ "../../node_modules/react-refresh/runtime.js");

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// src/demos/legal/demoSteps.ts




// Update the DemoStep type to accept dispatch and getState

var demoSteps = [(
/*#__PURE__*/
// Step 1: Add Organization
function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(dispatch, getState) {
    var org;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          org = {
            MSP: 'Org1MSP',
            assets: [],
            proposals: [],
            history: []
          };
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.addOrg)(org));
          console.log('Organization Org1MSP added.');
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()), (
/*#__PURE__*/
// Step 2: Add Asset
function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(dispatch, getState) {
    var assetData, asset;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          assetData = {
            name: 'Asset1',
            size: '400'
          };
          _context2.next = 4;
          return _services_fabricService__WEBPACK_IMPORTED_MODULE_0__["default"].addNewAsset('Org1MSP', assetData);
        case 4:
          asset = _context2.sent;
          console.log('Asset added successfully.', asset);

          // Update context and org with the new asset
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.setContextAsset)(asset));
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.addAssetToOrg)({
            orgMSP: 'Org1MSP',
            asset: asset
          }));
          _context2.next = 15;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error('Error adding asset:', _context2.t0);
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.setError)(_context2.t0.message || 'Failed to add asset'));
          throw _context2.t0;
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()), (
/*#__PURE__*/
// Step 3: Init Transfer Asset
function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(dispatch, getState) {
    var _getState, context, buyerMSP, sellerMSP, proposal;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _getState = getState(), context = _getState.demo.context;
          if (context.asset) {
            _context3.next = 4;
            break;
          }
          throw new Error('Asset data is missing. Cannot transfer.');
        case 4:
          buyerMSP = 'Org2MSP';
          sellerMSP = 'Org1MSP';
          _context3.next = 8;
          return _services_fabricService__WEBPACK_IMPORTED_MODULE_0__["default"].transferInit(context.asset, buyerMSP, sellerMSP);
        case 8:
          proposal = _context3.sent;
          console.log('Proposal sent successfully.', proposal);

          // Update context and org with the new proposal
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.setContextProposal)(proposal));
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.addProposalToOrg)({
            orgMSP: sellerMSP,
            proposal: proposal
          }));
          _context3.next = 19;
          break;
        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          console.error('Error initializing transfer:', _context3.t0);
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.setError)(_context3.t0.message || 'Failed to initialize transfer'));
          throw _context3.t0;
        case 19:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 14]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()), (
/*#__PURE__*/
// Step 4: Add Org2 and updateProposalsInOrg
function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(dispatch, getState) {
    var org, proposals;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          org = {
            MSP: 'Org2MSP',
            assets: [],
            proposals: [],
            history: []
          };
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.addOrg)(org));
          console.log('Organization Org2MSP added.');
          _context4.next = 6;
          return _services_fabricService__WEBPACK_IMPORTED_MODULE_0__["default"].getProposals('Org2MSP');
        case 6:
          proposals = _context4.sent;
          console.log('Proposals received successfully.', proposals);
          console.log('Proposal assetId', proposals[0].assetId);
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.updateProposalsInOrg)({
            orgMSP: 'Org2MSP',
            proposals: proposals
          }));
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.setContextProposal)(proposals[0]));
          _context4.next = 18;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.error('Error updating proposals:', _context4.t0);
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.setError)(_context4.t0.message || 'Failed to update proposals'));
          throw _context4.t0;
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()), (
/*#__PURE__*/
// Step 5: Accept Proposal
function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(dispatch, getState) {
    var _getState2, context;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _getState2 = getState(), context = _getState2.demo.context;
          if (context.proposal) {
            _context5.next = 4;
            break;
          }
          throw new Error('Proposal data is missing. Cannot accept.');
        case 4:
          console.log('Proposal Being Sent:', context.proposal);
          console.log('Proposal ID Being Sent:', context.proposal.id);
          _context5.next = 8;
          return _services_fabricService__WEBPACK_IMPORTED_MODULE_0__["default"].acceptProposal('Org2MSP', context.proposal.id);
        case 8:
          console.log('Proposal accepted successfully.');
          _context5.next = 16;
          break;
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.error('Error accepting proposal:', _context5.t0);
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.setError)(_context5.t0.message || 'Failed to accept proposal'));
          throw _context5.t0;
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()), (
/*#__PURE__*/
//Step 6: Update Proposal Again
function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(dispatch, getState) {
    var proposals;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _services_fabricService__WEBPACK_IMPORTED_MODULE_0__["default"].getProposals('Org2MSP');
        case 3:
          proposals = _context6.sent;
          console.log('Proposals received successfully.', proposals);
          console.log('Proposal assetId', proposals[0].assetId);
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.updateProposalsInOrg)({
            orgMSP: 'Org2MSP',
            proposals: proposals
          }));
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.setContextProposal)(proposals[0]));
          console.log(Org2proposals[0]);
          _context6.next = 16;
          break;
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          console.error('Error updating proposals:', _context6.t0);
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.setError)(_context6.t0.message || 'Failed to update proposals'));
          throw _context6.t0;
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 11]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()), (
/*#__PURE__*/
// Step 7: Transfer Asset
function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(dispatch, getState) {
    var _getState3, context, transferredAsset;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _getState3 = getState(), context = _getState3.demo.context;
          if (!(!context.asset || !context.proposal)) {
            _context7.next = 4;
            break;
          }
          throw new Error('Asset or Proposal data is missing. Cannot transfer.');
        case 4:
          _context7.next = 6;
          return _services_fabricService__WEBPACK_IMPORTED_MODULE_0__["default"].transferAsset('Org1MSP', context.asset, context.proposal);
        case 6:
          transferredAsset = _context7.sent;
          console.log('Asset transferred successfully.', transferredAsset);

          // Update context and org with the transferred asset
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.setContextAsset)(transferredAsset));
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.addAssetToOrg)({
            orgMSP: 'Org2MSP',
            asset: transferredAsset
          }));
          _context7.next = 17;
          break;
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          console.error('Error transferring asset:', _context7.t0);
          dispatch((0,_store_slices_demoSlice__WEBPACK_IMPORTED_MODULE_1__.setError)(_context7.t0.message || 'Failed to transfer asset'));
          throw _context7.t0;
        case 17:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 12]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}())];

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
/******/ 	__webpack_require__.h = () => ("7896299bba946113fd10")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.3fa7ff8735673db0b786.hot-update.js.map