"use strict";
self["webpackHotUpdatefrontend"]("main",{

/***/ "../../node_modules/@mui/material/CssBaseline/CssBaseline.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@mui/material/CssBaseline/CssBaseline.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   body: () => (/* binding */ body),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   html: () => (/* binding */ html),
/* harmony export */   styles: () => (/* binding */ styles)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _zero_styled_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../zero-styled/index.js */ "../../node_modules/@mui/material/zero-styled/index.js");
/* harmony import */ var _DefaultPropsProvider_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DefaultPropsProvider/index.js */ "../../node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
'use client';






// to determine if the global styles are static or dynamic

const isDynamicSupport = typeof (0,_zero_styled_index_js__WEBPACK_IMPORTED_MODULE_2__.globalCss)({}) === 'function';
const html = (theme, enableColorScheme) => ({
  WebkitFontSmoothing: 'antialiased',
  // Antialiasing.
  MozOsxFontSmoothing: 'grayscale',
  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: 'border-box',
  // Fix font resize problem in iOS
  WebkitTextSizeAdjust: '100%',
  // When used under CssVarsProvider, colorScheme should not be applied dynamically because it will generate the stylesheet twice for server-rendered applications.
  ...(enableColorScheme && !theme.vars && {
    colorScheme: theme.palette.mode
  })
});
const body = theme => ({
  color: (theme.vars || theme).palette.text.primary,
  ...theme.typography.body1,
  backgroundColor: (theme.vars || theme).palette.background.default,
  '@media print': {
    // Save printer ink.
    backgroundColor: (theme.vars || theme).palette.common.white
  }
});
const styles = (theme, enableColorScheme = false) => {
  const colorSchemeStyles = {};
  if (enableColorScheme && theme.colorSchemes && typeof theme.getColorSchemeSelector === 'function') {
    Object.entries(theme.colorSchemes).forEach(([key, scheme]) => {
      const selector = theme.getColorSchemeSelector(key);
      if (selector.startsWith('@')) {
        // for @media (prefers-color-scheme), we need to target :root
        colorSchemeStyles[selector] = {
          ':root': {
            colorScheme: scheme.palette?.mode
          }
        };
      } else {
        // else, it's likely that the selector already target an element with a class or data attribute
        colorSchemeStyles[selector.replace(/\s*&/, '')] = {
          colorScheme: scheme.palette?.mode
        };
      }
    });
  }
  let defaultStyles = {
    html: html(theme, enableColorScheme),
    '*, *::before, *::after': {
      boxSizing: 'inherit'
    },
    'strong, b': {
      fontWeight: theme.typography.fontWeightBold
    },
    body: {
      margin: 0,
      // Remove the margin in all browsers.
      ...body(theme),
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      '&::backdrop': {
        backgroundColor: (theme.vars || theme).palette.background.default
      }
    },
    ...colorSchemeStyles
  };
  const themeOverrides = theme.components?.MuiCssBaseline?.styleOverrides;
  if (themeOverrides) {
    defaultStyles = [defaultStyles, themeOverrides];
  }
  return defaultStyles;
};

// `ecs` stands for enableColorScheme. This is internal logic to make it work with Pigment CSS, so shorter is better.
const SELECTOR = 'mui-ecs';
const staticStyles = theme => {
  const result = styles(theme, false);
  const baseStyles = Array.isArray(result) ? result[0] : result;
  if (!theme.vars && baseStyles) {
    baseStyles.html[`:root:has(${SELECTOR})`] = {
      colorScheme: theme.palette.mode
    };
  }
  if (theme.colorSchemes) {
    Object.entries(theme.colorSchemes).forEach(([key, scheme]) => {
      const selector = theme.getColorSchemeSelector(key);
      if (selector.startsWith('@')) {
        // for @media (prefers-color-scheme), we need to target :root
        baseStyles[selector] = {
          [`:root:not(:has(.${SELECTOR}))`]: {
            colorScheme: scheme.palette?.mode
          }
        };
      } else {
        // else, it's likely that the selector already target an element with a class or data attribute
        baseStyles[selector.replace(/\s*&/, '')] = {
          [`&:not(:has(.${SELECTOR}))`]: {
            colorScheme: scheme.palette?.mode
          }
        };
      }
    });
  }
  return result;
};
const GlobalStyles = (0,_zero_styled_index_js__WEBPACK_IMPORTED_MODULE_2__.globalCss)(isDynamicSupport ? ({
  theme,
  enableColorScheme
}) => styles(theme, enableColorScheme) : ({
  theme
}) => staticStyles(theme));

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
function CssBaseline(inProps) {
  const props = (0,_DefaultPropsProvider_index_js__WEBPACK_IMPORTED_MODULE_3__.useDefaultProps)({
    props: inProps,
    name: 'MuiCssBaseline'
  });
  const {
    children,
    enableColorScheme = false
  } = props;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [isDynamicSupport && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(GlobalStyles, {
      enableColorScheme: enableColorScheme
    }), !isDynamicSupport && !enableColorScheme && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
      className: SELECTOR,
      style: {
        display: 'none'
      }
    }), children]
  });
}
 true ? CssBaseline.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * You can wrap a node.
   */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().node),
  /**
   * Enable `color-scheme` CSS property to use `theme.palette.mode`.
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   * @default false
   */
  enableColorScheme: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool)
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CssBaseline);

/***/ }),

/***/ "../../node_modules/@mui/material/InitColorSchemeScript/InitColorSchemeScript.js":
/*!***************************************************************************************!*\
  !*** ../../node_modules/@mui/material/InitColorSchemeScript/InitColorSchemeScript.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   defaultConfig: () => (/* binding */ defaultConfig)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_system_InitColorSchemeScript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/system/InitColorSchemeScript */ "../../node_modules/@mui/system/esm/InitColorSchemeScript/InitColorSchemeScript.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");



const defaultConfig = {
  attribute: 'data-mui-color-scheme',
  colorSchemeStorageKey: 'mui-color-scheme',
  defaultLightColorScheme: 'light',
  defaultDarkColorScheme: 'dark',
  modeStorageKey: 'mui-mode'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function InitColorSchemeScript(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_system_InitColorSchemeScript__WEBPACK_IMPORTED_MODULE_2__["default"], {
    ...defaultConfig,
    ...props
  });
});

/***/ }),

/***/ "../../node_modules/@mui/material/styles/ThemeProvider.js":
/*!****************************************************************!*\
  !*** ../../node_modules/@mui/material/styles/ThemeProvider.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ThemeProviderNoVars_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemeProviderNoVars.js */ "../../node_modules/@mui/material/styles/ThemeProviderNoVars.js");
/* harmony import */ var _ThemeProviderWithVars_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProviderWithVars.js */ "../../node_modules/@mui/material/styles/ThemeProviderWithVars.js");
/* harmony import */ var _identifier_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./identifier.js */ "../../node_modules/@mui/material/styles/identifier.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
'use client';






function ThemeProvider({
  theme,
  ...props
}) {
  if (typeof theme === 'function') {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ThemeProviderNoVars_js__WEBPACK_IMPORTED_MODULE_2__["default"], {
      theme: theme,
      ...props
    });
  }
  const muiTheme = _identifier_js__WEBPACK_IMPORTED_MODULE_3__["default"] in theme ? theme[_identifier_js__WEBPACK_IMPORTED_MODULE_3__["default"]] : theme;
  if (!('colorSchemes' in muiTheme)) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ThemeProviderNoVars_js__WEBPACK_IMPORTED_MODULE_2__["default"], {
      theme: theme,
      ...props
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ThemeProviderWithVars_js__WEBPACK_IMPORTED_MODULE_4__.CssVarsProvider, {
    theme: theme,
    ...props
  });
}

/***/ }),

/***/ "../../node_modules/@mui/material/styles/ThemeProviderNoVars.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@mui/material/styles/ThemeProviderNoVars.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ThemeProviderNoVars)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/system */ "../../node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js");
/* harmony import */ var _identifier_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./identifier.js */ "../../node_modules/@mui/material/styles/identifier.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
'use client';





function ThemeProviderNoVars({
  theme: themeInput,
  ...props
}) {
  const scopedTheme = _identifier_js__WEBPACK_IMPORTED_MODULE_2__["default"] in themeInput ? themeInput[_identifier_js__WEBPACK_IMPORTED_MODULE_2__["default"]] : undefined;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_system__WEBPACK_IMPORTED_MODULE_3__["default"], {
    ...props,
    themeId: scopedTheme ? _identifier_js__WEBPACK_IMPORTED_MODULE_2__["default"] : undefined,
    theme: scopedTheme || themeInput
  });
}

/***/ }),

/***/ "../../node_modules/@mui/material/styles/ThemeProviderWithVars.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@mui/material/styles/ThemeProviderWithVars.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CssVarsProvider: () => (/* binding */ CssVarsProvider),
/* harmony export */   Experimental_CssVarsProvider: () => (/* binding */ Experimental_CssVarsProvider),
/* harmony export */   getInitColorSchemeScript: () => (/* binding */ getInitColorSchemeScript),
/* harmony export */   useColorScheme: () => (/* binding */ useColorScheme)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_system_styleFunctionSx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/system/styleFunctionSx */ "../../node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js");
/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/system */ "../../node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js");
/* harmony import */ var _createTheme_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createTheme.js */ "../../node_modules/@mui/material/styles/createTheme.js");
/* harmony import */ var _createTypography_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./createTypography.js */ "../../node_modules/@mui/material/styles/createTypography.js");
/* harmony import */ var _identifier_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./identifier.js */ "../../node_modules/@mui/material/styles/identifier.js");
/* harmony import */ var _InitColorSchemeScript_InitColorSchemeScript_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../InitColorSchemeScript/InitColorSchemeScript.js */ "../../node_modules/@mui/material/InitColorSchemeScript/InitColorSchemeScript.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
'use client';









const {
  CssVarsProvider: InternalCssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript: deprecatedGetInitColorSchemeScript
} = (0,_mui_system__WEBPACK_IMPORTED_MODULE_2__["default"])({
  themeId: _identifier_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  // @ts-ignore ignore module augmentation tests
  theme: () => (0,_createTheme_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
    cssVariables: true
  }),
  colorSchemeStorageKey: _InitColorSchemeScript_InitColorSchemeScript_js__WEBPACK_IMPORTED_MODULE_5__.defaultConfig.colorSchemeStorageKey,
  modeStorageKey: _InitColorSchemeScript_InitColorSchemeScript_js__WEBPACK_IMPORTED_MODULE_5__.defaultConfig.modeStorageKey,
  defaultColorScheme: {
    light: _InitColorSchemeScript_InitColorSchemeScript_js__WEBPACK_IMPORTED_MODULE_5__.defaultConfig.defaultLightColorScheme,
    dark: _InitColorSchemeScript_InitColorSchemeScript_js__WEBPACK_IMPORTED_MODULE_5__.defaultConfig.defaultDarkColorScheme
  },
  resolveTheme: theme => {
    const newTheme = {
      ...theme,
      typography: (0,_createTypography_js__WEBPACK_IMPORTED_MODULE_6__["default"])(theme.palette, theme.typography)
    };
    newTheme.unstable_sx = function sx(props) {
      return (0,_mui_system_styleFunctionSx__WEBPACK_IMPORTED_MODULE_7__["default"])({
        sx: props,
        theme: this
      });
    };
    return newTheme;
  }
});
let warnedOnce = false;

// TODO: remove in v7
// eslint-disable-next-line @typescript-eslint/naming-convention
function Experimental_CssVarsProvider(props) {
  if (true) {
    if (!warnedOnce) {
      console.warn(['MUI: The Experimental_CssVarsProvider component has been ported into ThemeProvider.', '', "You should use `import { ThemeProvider } from '@mui/material/styles'` instead.", 'For more details, check out https://mui.com/material-ui/customization/css-theme-variables/usage/'].join('\n'));
      warnedOnce = true;
    }
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(InternalCssVarsProvider, {
    ...props
  });
}
let warnedInitScriptOnce = false;

// TODO: remove in v7
const getInitColorSchemeScript = params => {
  if (!warnedInitScriptOnce) {
    console.warn(['MUI: The getInitColorSchemeScript function has been deprecated.', '', "You should use `import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'`", 'and replace the function call with `<InitColorSchemeScript />` instead.'].join('\n'));
    warnedInitScriptOnce = true;
  }
  return deprecatedGetInitColorSchemeScript(params);
};

/**
 * TODO: remove this export in v7
 * @deprecated
 * The `CssVarsProvider` component has been deprecated and ported into `ThemeProvider`.
 *
 * You should use `ThemeProvider` and `createTheme()` instead:
 *
 * ```diff
 * - import { CssVarsProvider, extendTheme } from '@mui/material/styles';
 * + import { ThemeProvider, createTheme } from '@mui/material/styles';
 *
 * - const theme = extendTheme();
 * + const theme = createTheme({
 * +   cssVariables: true,
 * +   colorSchemes: { light: true, dark: true },
 * + });
 *
 * - <CssVarsProvider theme={theme}>
 * + <ThemeProvider theme={theme}>
 * ```
 *
 * To see the full documentation, check out https://mui.com/material-ui/customization/css-theme-variables/usage/.
 */
const CssVarsProvider = InternalCssVarsProvider;


/***/ }),

/***/ "../../node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/utils */ "../../node_modules/@mui/utils/esm/exactProp/exactProp.js");
/* harmony import */ var _useTheme_ThemeContext_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../useTheme/ThemeContext.js */ "../../node_modules/@mui/private-theming/useTheme/ThemeContext.js");
/* harmony import */ var _useTheme_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../useTheme/index.js */ "../../node_modules/@mui/private-theming/useTheme/useTheme.js");
/* harmony import */ var _nested_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nested.js */ "../../node_modules/@mui/private-theming/ThemeProvider/nested.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");







// To support composition of theme.

function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === 'function') {
    const mergedTheme = localTheme(outerTheme);
    if (true) {
      if (!mergedTheme) {
        console.error(['MUI: You should return an object from your theme function, i.e.', '<ThemeProvider theme={() => ({})} />'].join('\n'));
      }
    }
    return mergedTheme;
  }
  return {
    ...outerTheme,
    ...localTheme
  };
}

/**
 * This component takes a `theme` prop.
 * It makes the `theme` available down the React tree thanks to React context.
 * This component should preferably be used at **the root of your component tree**.
 */
function ThemeProvider(props) {
  const {
    children,
    theme: localTheme
  } = props;
  const outerTheme = (0,_useTheme_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
  if (true) {
    if (outerTheme === null && typeof localTheme === 'function') {
      console.error(['MUI: You are providing a theme function prop to the ThemeProvider component:', '<ThemeProvider theme={outerTheme => outerTheme} />', '', 'However, no outer theme is present.', 'Make sure a theme is already injected higher in the React tree ' + 'or provide a theme object.'].join('\n'));
    }
  }
  const theme = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    const output = outerTheme === null ? {
      ...localTheme
    } : mergeOuterLocalTheme(outerTheme, localTheme);
    if (output != null) {
      output[_nested_js__WEBPACK_IMPORTED_MODULE_3__["default"]] = outerTheme !== null;
    }
    return output;
  }, [localTheme, outerTheme]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_useTheme_ThemeContext_js__WEBPACK_IMPORTED_MODULE_4__["default"].Provider, {
    value: theme,
    children: children
  });
}
 true ? ThemeProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().node),
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: prop_types__WEBPACK_IMPORTED_MODULE_5___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_5___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func)]).isRequired
} : 0;
if (true) {
   true ? ThemeProvider.propTypes = (0,_mui_utils__WEBPACK_IMPORTED_MODULE_6__["default"])(ThemeProvider.propTypes) : 0;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeProvider);

/***/ }),

/***/ "../../node_modules/@mui/private-theming/ThemeProvider/nested.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@mui/private-theming/ThemeProvider/nested.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const hasSymbol = typeof Symbol === 'function' && Symbol.for;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hasSymbol ? Symbol.for('mui.nested') : '__THEME_NESTED__');

/***/ }),

/***/ "../../node_modules/@mui/private-theming/useTheme/ThemeContext.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@mui/private-theming/useTheme/ThemeContext.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ThemeContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  ThemeContext.displayName = 'ThemeContext';
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeContext);

/***/ }),

/***/ "../../node_modules/@mui/private-theming/useTheme/useTheme.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@mui/private-theming/useTheme/useTheme.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useTheme)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ThemeContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThemeContext.js */ "../../node_modules/@mui/private-theming/useTheme/ThemeContext.js");


function useTheme() {
  const theme = react__WEBPACK_IMPORTED_MODULE_0__.useContext(_ThemeContext_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
  if (true) {
    // TODO: uncomment once we enable eslint-plugin-react-compiler eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/rules-of-hooks -- It's not required to run React.useDebugValue in production
    react__WEBPACK_IMPORTED_MODULE_0__.useDebugValue(theme);
  }
  return theme;
}

/***/ }),

/***/ "../../node_modules/@mui/system/esm/InitColorSchemeScript/InitColorSchemeScript.js":
/*!*****************************************************************************************!*\
  !*** ../../node_modules/@mui/system/esm/InitColorSchemeScript/InitColorSchemeScript.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_ATTRIBUTE: () => (/* binding */ DEFAULT_ATTRIBUTE),
/* harmony export */   DEFAULT_COLOR_SCHEME_STORAGE_KEY: () => (/* binding */ DEFAULT_COLOR_SCHEME_STORAGE_KEY),
/* harmony export */   DEFAULT_MODE_STORAGE_KEY: () => (/* binding */ DEFAULT_MODE_STORAGE_KEY),
/* harmony export */   "default": () => (/* binding */ InitColorSchemeScript)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
/**
 * Split this component for RSC import
 */


const DEFAULT_MODE_STORAGE_KEY = 'mode';
const DEFAULT_COLOR_SCHEME_STORAGE_KEY = 'color-scheme';
const DEFAULT_ATTRIBUTE = 'data-color-scheme';
function InitColorSchemeScript(options) {
  const {
    defaultMode = 'system',
    defaultLightColorScheme = 'light',
    defaultDarkColorScheme = 'dark',
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    attribute: initialAttribute = DEFAULT_ATTRIBUTE,
    colorSchemeNode = 'document.documentElement',
    nonce
  } = options || {};
  let setter = '';
  let attribute = initialAttribute;
  if (initialAttribute === 'class') {
    attribute = '.%s';
  }
  if (initialAttribute === 'data') {
    attribute = '[data-%s]';
  }
  if (attribute.startsWith('.')) {
    const selector = attribute.substring(1);
    setter += `${colorSchemeNode}.classList.remove('${selector}'.replace('%s', light), '${selector}'.replace('%s', dark));
      ${colorSchemeNode}.classList.add('${selector}'.replace('%s', colorScheme));`;
  }
  const matches = attribute.match(/\[([^\]]+)\]/); // case [data-color-scheme=%s] or [data-color-scheme]
  if (matches) {
    const [attr, value] = matches[1].split('=');
    if (!value) {
      setter += `${colorSchemeNode}.removeAttribute('${attr}'.replace('%s', light));
      ${colorSchemeNode}.removeAttribute('${attr}'.replace('%s', dark));`;
    }
    setter += `
      ${colorSchemeNode}.setAttribute('${attr}'.replace('%s', colorScheme), ${value ? `${value}.replace('%s', colorScheme)` : '""'});`;
  } else {
    setter += `${colorSchemeNode}.setAttribute('${attribute}', colorScheme);`;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("script", {
    suppressHydrationWarning: true,
    nonce: typeof window === 'undefined' ? nonce : ''
    // eslint-disable-next-line react/no-danger
    ,
    dangerouslySetInnerHTML: {
      __html: `(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem('${modeStorageKey}') || '${defaultMode}';
  const dark = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
  const light = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
  if (mode === 'system') {
    // handle system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${setter}
  }
} catch(e){}})();`
    }
  }, "mui-color-scheme-init");
}

/***/ }),

/***/ "../../node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_private_theming__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/private-theming */ "../../node_modules/@mui/private-theming/useTheme/useTheme.js");
/* harmony import */ var _mui_private_theming__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/private-theming */ "../../node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js");
/* harmony import */ var _mui_utils_exactProp__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/utils/exactProp */ "../../node_modules/@mui/utils/esm/exactProp/exactProp.js");
/* harmony import */ var _mui_styled_engine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/styled-engine */ "../../node_modules/@emotion/react/dist/emotion-element-7a1343fa.browser.development.esm.js");
/* harmony import */ var _useThemeWithoutDefault_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../useThemeWithoutDefault/index.js */ "../../node_modules/@mui/system/esm/useThemeWithoutDefault/useThemeWithoutDefault.js");
/* harmony import */ var _RtlProvider_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../RtlProvider/index.js */ "../../node_modules/@mui/system/esm/RtlProvider/index.js");
/* harmony import */ var _DefaultPropsProvider_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../DefaultPropsProvider/index.js */ "../../node_modules/@mui/system/esm/DefaultPropsProvider/DefaultPropsProvider.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
'use client';










const EMPTY_THEME = {};
function useThemeScoping(themeId, upperTheme, localTheme, isPrivate = false) {
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    const resolvedTheme = themeId ? upperTheme[themeId] || upperTheme : upperTheme;
    if (typeof localTheme === 'function') {
      const mergedTheme = localTheme(resolvedTheme);
      const result = themeId ? {
        ...upperTheme,
        [themeId]: mergedTheme
      } : mergedTheme;
      // must return a function for the private theme to NOT merge with the upper theme.
      // see the test case "use provided theme from a callback" in ThemeProvider.test.js
      if (isPrivate) {
        return () => result;
      }
      return result;
    }
    return themeId ? {
      ...upperTheme,
      [themeId]: localTheme
    } : {
      ...upperTheme,
      ...localTheme
    };
  }, [themeId, upperTheme, localTheme, isPrivate]);
}

/**
 * This component makes the `theme` available down the React tree.
 * It should preferably be used at **the root of your component tree**.
 *
 * <ThemeProvider theme={theme}> // existing use case
 * <ThemeProvider theme={{ id: theme }}> // theme scoping
 */
function ThemeProvider(props) {
  const {
    children,
    theme: localTheme,
    themeId
  } = props;
  const upperTheme = (0,_useThemeWithoutDefault_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(EMPTY_THEME);
  const upperPrivateTheme = (0,_mui_private_theming__WEBPACK_IMPORTED_MODULE_3__["default"])() || EMPTY_THEME;
  if (true) {
    if (upperTheme === null && typeof localTheme === 'function' || themeId && upperTheme && !upperTheme[themeId] && typeof localTheme === 'function') {
      console.error(['MUI: You are providing a theme function prop to the ThemeProvider component:', '<ThemeProvider theme={outerTheme => outerTheme} />', '', 'However, no outer theme is present.', 'Make sure a theme is already injected higher in the React tree ' + 'or provide a theme object.'].join('\n'));
    }
  }
  const engineTheme = useThemeScoping(themeId, upperTheme, localTheme);
  const privateTheme = useThemeScoping(themeId, upperPrivateTheme, localTheme, true);
  const rtlValue = (themeId ? engineTheme[themeId] : engineTheme).direction === 'rtl';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_private_theming__WEBPACK_IMPORTED_MODULE_4__["default"], {
    theme: privateTheme,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_styled_engine__WEBPACK_IMPORTED_MODULE_5__.T.Provider, {
      value: engineTheme,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_RtlProvider_index_js__WEBPACK_IMPORTED_MODULE_6__["default"], {
        value: rtlValue,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_DefaultPropsProvider_index_js__WEBPACK_IMPORTED_MODULE_7__["default"], {
          value: themeId ? engineTheme[themeId].components : engineTheme.components,
          children: children
        })
      })
    })
  });
}
 true ? ThemeProvider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Your component tree.
   */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().node),
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: prop_types__WEBPACK_IMPORTED_MODULE_8___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_8___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_8___default().object)]).isRequired,
  /**
   * The design system's unique id for getting the corresponded theme when there are multiple design systems.
   */
  themeId: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string)
} : 0;
if (true) {
   true ? ThemeProvider.propTypes = (0,_mui_utils_exactProp__WEBPACK_IMPORTED_MODULE_9__["default"])(ThemeProvider.propTypes) : 0;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeProvider);

/***/ }),

/***/ "../../node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DISABLE_CSS_TRANSITION: () => (/* binding */ DISABLE_CSS_TRANSITION),
/* harmony export */   "default": () => (/* binding */ createCssVarsProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_styled_engine__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/styled-engine */ "../../node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js");
/* harmony import */ var _mui_private_theming__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/private-theming */ "../../node_modules/@mui/private-theming/useTheme/useTheme.js");
/* harmony import */ var _ThemeProvider_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ThemeProvider/index.js */ "../../node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js");
/* harmony import */ var _InitColorSchemeScript_InitColorSchemeScript_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../InitColorSchemeScript/InitColorSchemeScript.js */ "../../node_modules/@mui/system/esm/InitColorSchemeScript/InitColorSchemeScript.js");
/* harmony import */ var _useCurrentColorScheme_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useCurrentColorScheme.js */ "../../node_modules/@mui/system/esm/cssVars/useCurrentColorScheme.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");








const DISABLE_CSS_TRANSITION = '*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}';
function createCssVarsProvider(options) {
  const {
    themeId,
    /**
     * This `theme` object needs to follow a certain structure to
     * be used correctly by the finel `CssVarsProvider`. It should have a
     * `colorSchemes` key with the light and dark (and any other) palette.
     * It should also ideally have a vars object created using `prepareCssVars`.
     */
    theme: defaultTheme = {},
    modeStorageKey: defaultModeStorageKey = _InitColorSchemeScript_InitColorSchemeScript_js__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey: defaultColorSchemeStorageKey = _InitColorSchemeScript_InitColorSchemeScript_js__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    disableTransitionOnChange: designSystemTransitionOnChange = false,
    defaultColorScheme,
    resolveTheme
  } = options;
  const defaultContext = {
    allColorSchemes: [],
    colorScheme: undefined,
    darkColorScheme: undefined,
    lightColorScheme: undefined,
    mode: undefined,
    setColorScheme: () => {},
    setMode: () => {},
    systemMode: undefined
  };
  const ColorSchemeContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
  if (true) {
    ColorSchemeContext.displayName = 'ColorSchemeContext';
  }
  const useColorScheme = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(ColorSchemeContext) || defaultContext;
  function CssVarsProvider(props) {
    const {
      children,
      theme: themeProp,
      modeStorageKey = defaultModeStorageKey,
      colorSchemeStorageKey = defaultColorSchemeStorageKey,
      disableTransitionOnChange = designSystemTransitionOnChange,
      storageWindow = typeof window === 'undefined' ? undefined : window,
      documentNode = typeof document === 'undefined' ? undefined : document,
      colorSchemeNode = typeof document === 'undefined' ? undefined : document.documentElement,
      disableNestedContext = false,
      disableStyleSheetGeneration = false,
      defaultMode: initialMode = 'system'
    } = props;
    const hasMounted = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const upperTheme = (0,_mui_private_theming__WEBPACK_IMPORTED_MODULE_3__["default"])();
    const ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(ColorSchemeContext);
    const nested = !!ctx && !disableNestedContext;
    const initialTheme = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
      if (themeProp) {
        return themeProp;
      }
      return typeof defaultTheme === 'function' ? defaultTheme() : defaultTheme;
    }, [themeProp]);
    const scopedTheme = initialTheme[themeId];
    const {
      colorSchemes = {},
      components = {},
      cssVarPrefix,
      ...restThemeProp
    } = scopedTheme || initialTheme;
    const joinedColorSchemes = Object.keys(colorSchemes).filter(k => !!colorSchemes[k]).join(',');
    const allColorSchemes = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => joinedColorSchemes.split(','), [joinedColorSchemes]);
    const defaultLightColorScheme = typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.light;
    const defaultDarkColorScheme = typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.dark;
    const defaultMode = colorSchemes[defaultLightColorScheme] && colorSchemes[defaultDarkColorScheme] ? initialMode : colorSchemes[restThemeProp.defaultColorScheme]?.palette?.mode || restThemeProp.palette?.mode;

    // 1. Get the data about the `mode`, `colorScheme`, and setter functions.
    const {
      mode: stateMode,
      setMode,
      systemMode,
      lightColorScheme,
      darkColorScheme,
      colorScheme: stateColorScheme,
      setColorScheme
    } = (0,_useCurrentColorScheme_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
      supportedColorSchemes: allColorSchemes,
      defaultLightColorScheme,
      defaultDarkColorScheme,
      modeStorageKey,
      colorSchemeStorageKey,
      defaultMode,
      storageWindow
    });
    let mode = stateMode;
    let colorScheme = stateColorScheme;
    if (nested) {
      mode = ctx.mode;
      colorScheme = ctx.colorScheme;
    }

    // `colorScheme` is undefined on the server and hydration phase
    const calculatedColorScheme = colorScheme || restThemeProp.defaultColorScheme;

    // 2. get the `vars` object that refers to the CSS custom properties
    const themeVars = restThemeProp.generateThemeVars?.() || restThemeProp.vars;

    // 3. Start composing the theme object
    const theme = {
      ...restThemeProp,
      components,
      colorSchemes,
      cssVarPrefix,
      vars: themeVars
    };
    if (typeof theme.generateSpacing === 'function') {
      theme.spacing = theme.generateSpacing();
    }

    // 4. Resolve the color scheme and merge it to the theme
    if (calculatedColorScheme) {
      const scheme = colorSchemes[calculatedColorScheme];
      if (scheme && typeof scheme === 'object') {
        // 4.1 Merge the selected color scheme to the theme
        Object.keys(scheme).forEach(schemeKey => {
          if (scheme[schemeKey] && typeof scheme[schemeKey] === 'object') {
            // shallow merge the 1st level structure of the theme.
            theme[schemeKey] = {
              ...theme[schemeKey],
              ...scheme[schemeKey]
            };
          } else {
            theme[schemeKey] = scheme[schemeKey];
          }
        });
      }
    }

    // 5. Declaring effects
    // 5.1 Updates the selector value to use the current color scheme which tells CSS to use the proper stylesheet.
    const colorSchemeSelector = restThemeProp.colorSchemeSelector;
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
      if (colorScheme && colorSchemeNode && colorSchemeSelector && colorSchemeSelector !== 'media') {
        const selector = colorSchemeSelector;
        let rule = colorSchemeSelector;
        if (selector === 'class') {
          rule = `.%s`;
        }
        if (selector === 'data') {
          rule = `[data-%s]`;
        }
        if (selector?.startsWith('data-') && !selector.includes('%s')) {
          // 'data-mui-color-scheme' -> '[data-mui-color-scheme="%s"]'
          rule = `[${selector}="%s"]`;
        }
        if (rule.startsWith('.')) {
          colorSchemeNode.classList.remove(...allColorSchemes.map(scheme => rule.substring(1).replace('%s', scheme)));
          colorSchemeNode.classList.add(rule.substring(1).replace('%s', colorScheme));
        } else {
          const matches = rule.replace('%s', colorScheme).match(/\[([^\]]+)\]/);
          if (matches) {
            const [attr, value] = matches[1].split('=');
            if (!value) {
              // for attributes like `data-theme-dark`, `data-theme-light`
              // remove all the existing data attributes before setting the new one
              allColorSchemes.forEach(scheme => {
                colorSchemeNode.removeAttribute(attr.replace(colorScheme, scheme));
              });
            }
            colorSchemeNode.setAttribute(attr, value ? value.replace(/"|'/g, '') : '');
          } else {
            colorSchemeNode.setAttribute(rule, colorScheme);
          }
        }
      }
    }, [colorScheme, colorSchemeSelector, colorSchemeNode, allColorSchemes]);

    // 5.2 Remove the CSS transition when color scheme changes to create instant experience.
    // credit: https://github.com/pacocoursey/next-themes/blob/b5c2bad50de2d61ad7b52a9c5cdc801a78507d7a/index.tsx#L313
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
      let timer;
      if (disableTransitionOnChange && hasMounted.current && documentNode) {
        const css = documentNode.createElement('style');
        css.appendChild(documentNode.createTextNode(DISABLE_CSS_TRANSITION));
        documentNode.head.appendChild(css);

        // Force browser repaint
        (() => window.getComputedStyle(documentNode.body))();
        timer = setTimeout(() => {
          documentNode.head.removeChild(css);
        }, 1);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [colorScheme, disableTransitionOnChange, documentNode]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
      hasMounted.current = true;
      return () => {
        hasMounted.current = false;
      };
    }, []);
    const contextValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
      allColorSchemes,
      colorScheme,
      darkColorScheme,
      lightColorScheme,
      mode,
      setColorScheme,
      setMode,
      systemMode
    }), [allColorSchemes, colorScheme, darkColorScheme, lightColorScheme, mode, setColorScheme, setMode, systemMode]);
    let shouldGenerateStyleSheet = true;
    if (disableStyleSheetGeneration || restThemeProp.cssVariables === false || nested && upperTheme?.cssVarPrefix === cssVarPrefix) {
      shouldGenerateStyleSheet = false;
    }
    const element = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ThemeProvider_index_js__WEBPACK_IMPORTED_MODULE_5__["default"], {
        themeId: scopedTheme ? themeId : undefined,
        theme: resolveTheme ? resolveTheme(theme) : theme,
        children: children
      }), shouldGenerateStyleSheet && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_styled_engine__WEBPACK_IMPORTED_MODULE_6__["default"], {
        styles: theme.generateStyleSheets?.() || []
      })]
    });
    if (nested) {
      return element;
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ColorSchemeContext.Provider, {
      value: contextValue,
      children: element
    });
  }
   true ? CssVarsProvider.propTypes = {
    /**
     * The component tree.
     */
    children: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().node),
    /**
     * The node used to attach the color-scheme attribute
     */
    colorSchemeNode: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().any),
    /**
     * localStorage key used to store `colorScheme`
     */
    colorSchemeStorageKey: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    /**
     * The default mode when the storage is empty,
     * require the theme to have `colorSchemes` with light and dark.
     */
    defaultMode: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    /**
     * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
     */
    disableNestedContext: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),
    /**
     * If `true`, the style sheet won't be generated.
     *
     * This is useful for controlling nested CssVarsProvider behavior.
     */
    disableStyleSheetGeneration: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),
    /**
     * Disable CSS transitions when switching between modes or color schemes.
     */
    disableTransitionOnChange: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),
    /**
     * The document to attach the attribute to.
     */
    documentNode: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().any),
    /**
     * The key in the local storage used to store current color scheme.
     */
    modeStorageKey: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
    /**
     * The window that attaches the 'storage' event listener.
     * @default window
     */
    storageWindow: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().any),
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object)
  } : 0;
  const defaultLightColorScheme = typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.light;
  const defaultDarkColorScheme = typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.dark;
  const getInitColorSchemeScript = params => (0,_InitColorSchemeScript_InitColorSchemeScript_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    colorSchemeStorageKey: defaultColorSchemeStorageKey,
    defaultLightColorScheme,
    defaultDarkColorScheme,
    modeStorageKey: defaultModeStorageKey,
    ...params
  });
  return {
    CssVarsProvider,
    useColorScheme,
    getInitColorSchemeScript
  };
}

/***/ }),

/***/ "../../node_modules/@mui/system/esm/cssVars/useCurrentColorScheme.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@mui/system/esm/cssVars/useCurrentColorScheme.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useCurrentColorScheme),
/* harmony export */   getColorScheme: () => (/* binding */ getColorScheme),
/* harmony export */   getSystemMode: () => (/* binding */ getSystemMode)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _InitColorSchemeScript_InitColorSchemeScript_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../InitColorSchemeScript/InitColorSchemeScript.js */ "../../node_modules/@mui/system/esm/InitColorSchemeScript/InitColorSchemeScript.js");
'use client';



function getSystemMode(mode) {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function' && mode === 'system') {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      return 'dark';
    }
    return 'light';
  }
  return undefined;
}
function processState(state, callback) {
  if (state.mode === 'light' || state.mode === 'system' && state.systemMode === 'light') {
    return callback('light');
  }
  if (state.mode === 'dark' || state.mode === 'system' && state.systemMode === 'dark') {
    return callback('dark');
  }
  return undefined;
}
function getColorScheme(state) {
  return processState(state, mode => {
    if (mode === 'light') {
      return state.lightColorScheme;
    }
    if (mode === 'dark') {
      return state.darkColorScheme;
    }
    return undefined;
  });
}
function initializeValue(key, defaultValue) {
  if (typeof window === 'undefined') {
    return undefined;
  }
  let value;
  try {
    value = localStorage.getItem(key) || undefined;
    if (!value) {
      // the first time that user enters the site.
      localStorage.setItem(key, defaultValue);
    }
  } catch {
    // Unsupported
  }
  return value || defaultValue;
}
function useCurrentColorScheme(options) {
  const {
    defaultMode = 'light',
    defaultLightColorScheme,
    defaultDarkColorScheme,
    supportedColorSchemes = [],
    modeStorageKey = _InitColorSchemeScript_InitColorSchemeScript_js__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = _InitColorSchemeScript_InitColorSchemeScript_js__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    storageWindow = typeof window === 'undefined' ? undefined : window
  } = options;
  const joinedColorSchemes = supportedColorSchemes.join(',');
  const isMultiSchemes = supportedColorSchemes.length > 1;
  const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => {
    const initialMode = initializeValue(modeStorageKey, defaultMode);
    const lightColorScheme = initializeValue(`${colorSchemeStorageKey}-light`, defaultLightColorScheme);
    const darkColorScheme = initializeValue(`${colorSchemeStorageKey}-dark`, defaultDarkColorScheme);
    return {
      mode: initialMode,
      systemMode: getSystemMode(initialMode),
      lightColorScheme,
      darkColorScheme
    };
  });
  // This could be improved with `React.useSyncExternalStore` in the future.
  const [, setHasMounted] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  const hasMounted = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (isMultiSchemes) {
      setHasMounted(true); // to rerender the component after hydration
    }
    hasMounted.current = true;
  }, [isMultiSchemes]);
  const colorScheme = getColorScheme(state);
  const setMode = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(mode => {
    setState(currentState => {
      if (mode === currentState.mode) {
        // do nothing if mode does not change
        return currentState;
      }
      const newMode = mode ?? defaultMode;
      try {
        localStorage.setItem(modeStorageKey, newMode);
      } catch {
        // Unsupported
      }
      return {
        ...currentState,
        mode: newMode,
        systemMode: getSystemMode(newMode)
      };
    });
  }, [modeStorageKey, defaultMode]);
  const setColorScheme = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(value => {
    if (!value) {
      setState(currentState => {
        try {
          localStorage.setItem(`${colorSchemeStorageKey}-light`, defaultLightColorScheme);
          localStorage.setItem(`${colorSchemeStorageKey}-dark`, defaultDarkColorScheme);
        } catch {
          // Unsupported
        }
        return {
          ...currentState,
          lightColorScheme: defaultLightColorScheme,
          darkColorScheme: defaultDarkColorScheme
        };
      });
    } else if (typeof value === 'string') {
      if (value && !joinedColorSchemes.includes(value)) {
        console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
      } else {
        setState(currentState => {
          const newState = {
            ...currentState
          };
          processState(currentState, mode => {
            try {
              localStorage.setItem(`${colorSchemeStorageKey}-${mode}`, value);
            } catch {
              // Unsupported
            }
            if (mode === 'light') {
              newState.lightColorScheme = value;
            }
            if (mode === 'dark') {
              newState.darkColorScheme = value;
            }
          });
          return newState;
        });
      }
    } else {
      setState(currentState => {
        const newState = {
          ...currentState
        };
        const newLightColorScheme = value.light === null ? defaultLightColorScheme : value.light;
        const newDarkColorScheme = value.dark === null ? defaultDarkColorScheme : value.dark;
        if (newLightColorScheme) {
          if (!joinedColorSchemes.includes(newLightColorScheme)) {
            console.error(`\`${newLightColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
          } else {
            newState.lightColorScheme = newLightColorScheme;
            try {
              localStorage.setItem(`${colorSchemeStorageKey}-light`, newLightColorScheme);
            } catch (error) {
              // Unsupported
            }
          }
        }
        if (newDarkColorScheme) {
          if (!joinedColorSchemes.includes(newDarkColorScheme)) {
            console.error(`\`${newDarkColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
          } else {
            newState.darkColorScheme = newDarkColorScheme;
            try {
              localStorage.setItem(`${colorSchemeStorageKey}-dark`, newDarkColorScheme);
            } catch (error) {
              // Unsupported
            }
          }
        }
        return newState;
      });
    }
  }, [joinedColorSchemes, colorSchemeStorageKey, defaultLightColorScheme, defaultDarkColorScheme]);
  const handleMediaQuery = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(event => {
    if (state.mode === 'system') {
      setState(currentState => {
        const systemMode = event?.matches ? 'dark' : 'light';

        // Early exit, nothing changed.
        if (currentState.systemMode === systemMode) {
          return currentState;
        }
        return {
          ...currentState,
          systemMode
        };
      });
    }
  }, [state.mode]);

  // Ref hack to avoid adding handleMediaQuery as a dep
  const mediaListener = react__WEBPACK_IMPORTED_MODULE_0__.useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (typeof window.matchMedia !== 'function' || !isMultiSchemes) {
      return undefined;
    }
    const handler = (...args) => mediaListener.current(...args);

    // Always listen to System preference
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handler);
    handler(media);
    return () => {
      media.removeListener(handler);
    };
  }, [isMultiSchemes]);

  // Handle when localStorage has changed
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (storageWindow && isMultiSchemes) {
      const handleStorage = event => {
        const value = event.newValue;
        if (typeof event.key === 'string' && event.key.startsWith(colorSchemeStorageKey) && (!value || joinedColorSchemes.match(value))) {
          // If the key is deleted, value will be null then reset color scheme to the default one.
          if (event.key.endsWith('light')) {
            setColorScheme({
              light: value
            });
          }
          if (event.key.endsWith('dark')) {
            setColorScheme({
              dark: value
            });
          }
        }
        if (event.key === modeStorageKey && (!value || ['light', 'dark', 'system'].includes(value))) {
          setMode(value || defaultMode);
        }
      };
      // For syncing color-scheme changes between iframes
      storageWindow.addEventListener('storage', handleStorage);
      return () => {
        storageWindow.removeEventListener('storage', handleStorage);
      };
    }
    return undefined;
  }, [setColorScheme, setMode, modeStorageKey, colorSchemeStorageKey, joinedColorSchemes, defaultMode, storageWindow, isMultiSchemes]);
  return {
    ...state,
    mode: hasMounted.current || !isMultiSchemes ? state.mode : undefined,
    systemMode: hasMounted.current || !isMultiSchemes ? state.systemMode : undefined,
    colorScheme: hasMounted.current || !isMultiSchemes ? colorScheme : undefined,
    setMode,
    setColorScheme
  };
}

/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_TopMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/TopMenu */ "./src/shared/TopMenu.tsx");
/* harmony import */ var _shared_Sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/Sidebar */ "./src/shared/Sidebar.tsx");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "../../node_modules/@mui/material/Box/Box.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "../../node_modules/react-router/dist/index.js");
/* harmony import */ var _pages_DemoPage_DemoPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/DemoPage/DemoPage */ "./src/pages/DemoPage/DemoPage.tsx");
/* harmony import */ var _pages_DocsPage_DocsPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/DocsPage/DocsPage */ "./src/pages/DocsPage/DocsPage.tsx");
/* harmony import */ var _fontsource_poppins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fontsource/poppins */ "../../node_modules/@fontsource/poppins/index.css");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ../../node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "../../node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../node_modules/react-refresh/runtime.js */ "../../node_modules/react-refresh/runtime.js");

// src/frontend/src/App.tsx








function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      display: 'flex',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_shared_Sidebar__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_shared_TopMenu__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    component: "main",
    sx: {
      flexGrow: 1,
      p: 3,
      mt: '80px',
      ml: '295px' // Offset by Sidebar width
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Route, {
    path: "/",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Navigate, {
      to: "/demo",
      replace: true
    })
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Route, {
    path: "/demo",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pages_DemoPage_DemoPage__WEBPACK_IMPORTED_MODULE_3__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Route, {
    path: "/docs/*",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_pages_DocsPage_DocsPage__WEBPACK_IMPORTED_MODULE_4__["default"], null)
  })))));
}
_c = App;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);
var _c;
__webpack_require__.$Refresh$.register(_c, "App");

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

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "../../node_modules/react-dom/client.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/App.tsx");
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_App__WEBPACK_IMPORTED_MODULE_2__["default"], null))))));
} else {
  throw new Error('Root element not found');
}

// Enable Hot Module Replacement (HMR)
if (true) {
  module.hot.accept(/*! ./App */ "./src/App.tsx", __WEBPACK_OUTDATED_DEPENDENCIES__ => { /* harmony import */ _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/App.tsx");
(function () {
    // Dynamically import the updated App component
    Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./App */ "./src/App.tsx")).then(function (_ref) {
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

/***/ }),

/***/ "./src/store/slices/orgsSlice.ts":
/*!***************************************!*\
  !*** ./src/store/slices/orgsSlice.ts ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   selectOrg: () => (/* binding */ selectOrg)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "../../node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ../../node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "../../node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../node_modules/react-refresh/runtime.js */ "../../node_modules/react-refresh/runtime.js");


var initialState = {
  selectedOrg: 'Org1MSP'
};
var orgsSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
  name: 'orgs',
  initialState: initialState,
  reducers: {
    selectOrg: function selectOrg(state, action) {
      state.selectedOrg = action.payload;
    }
  }
});
var selectOrg = orgsSlice.actions.selectOrg;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (orgsSlice.reducer);

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

/***/ }),

/***/ "./src/store/store.ts":
/*!****************************!*\
  !*** ./src/store/store.ts ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @reduxjs/toolkit */ "../../node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
/* harmony import */ var _slices_demoSlice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slices/demoSlice */ "./src/store/slices/demoSlice.ts");
/* harmony import */ var _slices_docsSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slices/docsSlice */ "./src/store/slices/docsSlice.ts");
/* harmony import */ var _slices_orgsSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slices/orgsSlice */ "./src/store/slices/orgsSlice.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ../../node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "../../node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../node_modules/react-refresh/runtime.js */ "../../node_modules/react-refresh/runtime.js");

// src/store/store.ts




var store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__.configureStore)({
  reducer: {
    demo: _slices_demoSlice__WEBPACK_IMPORTED_MODULE_0__["default"],
    docs: _slices_docsSlice__WEBPACK_IMPORTED_MODULE_1__["default"],
    orgs: _slices_orgsSlice__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);

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

/***/ }),

/***/ "./src/styles/theme-mui.ts":
/*!*********************************!*\
  !*** ./src/styles/theme-mui.ts ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/styles */ "../../node_modules/@mui/material/styles/createTheme.js");
/* harmony import */ var _fontsource_poppins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fontsource/poppins */ "../../node_modules/@fontsource/poppins/index.css");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ../../node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "../../node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../node_modules/react-refresh/runtime.js */ "../../node_modules/react-refresh/runtime.js");

// theme.ts


var theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_1__["default"])({
  palette: {
    mode: 'dark',
    // Enable dark mode
    primary: {
      main: '#769D7A',
      // Light blue for contrast in dark mode
      dark: '#E3AE3C',
      light: '#E3AE3C',
      contrastText: '#000000'
    },
    secondary: {
      main: '#f48fb1',
      // Pink accent color
      dark: '#d81b60',
      light: '#f8bbd0',
      contrastText: '#000000'
    },
    background: {
      "default": '#151220',
      // Dark background
      paper: '#383543',
      sidebar: '#2F354C' // Sidebar background color    // Slightly lighter for surfaces
    },
    text: {
      primary: '#e6e3e3',
      // White text for readability
      secondary: '#D2CCB9' // Grey for secondary text
    }
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: {
      fontSize: '2.2rem',
      fontWeight: 600
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 500
    },
    h6: {
      fontWeight: 700 // Bold for titles
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 700
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400
    },
    button: {
      textTransform: 'none' // Keep button text capitalization
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#90caf9' // Use the primary main color
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#90caf9',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#bd8202' // Slightly darker on hover
          }
        },
        containedSecondary: {
          backgroundColor: '#f48fb1',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#f06292'
          }
        },
        outlinedPrimary: {
          borderColor: '#cf9e36',
          color: '#90caf9',
          '&:hover': {
            borderColor: '#E3AE3C',
            backgroundColor: '#cf9e36'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' // Enhanced shadow for depth
        }
      }
    }
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);

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
/******/ 	__webpack_require__.h = () => ("abf58e3d090df0627941")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.9cfdb3357d2b55be5bdf.hot-update.js.map