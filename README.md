This repo has 2 branches: `master` which does not work correctly, and `working-without-lerna`, which works as expected.

The problem comes from the fact that when Webpack is building the assets, it does not properly include `moment` when it is located in `packages/timeModule/node_modules`. This is where it ends up with Lerna because that module has it's own `node_modules` folder. Passing `--hoist` to Lerna will make this simple example work, but does not actually solve the problem.

# Why doesn't moment get included properly?

In the broken version, it appears that Webpack simply includes `moment.js` as is and results in:
```
Cannot set property 'moment' of undefined
    TypeError: Cannot set property 'moment' of undefined
    at http://localhost:6007/vendors~main.f4ce6b32bc79f7651537.bundle.js:66663:309
    at Module.<anonymous> (http://localhost:6007/vendors~main.f4ce6b32bc79f7651537.bundle.js:66664:3)
    at Module../packages/timeModule/node_modules/moment/moment.js (http://localhost:6007/vendors~main.f4ce6b32bc79f7651537.bundle.js:71242:30)
    at __webpack_require__ (http://localhost:6007/runtime~main.f4ce6b32bc79f7651537.bundle.js:782:30)
    at fn (http://localhost:6007/runtime~main.f4ce6b32bc79f7651537.bundle.js:150:20)
    at Module../packages/timeModule/index.js (http://localhost:6007/main.f4ce6b32bc79f7651537.bundle.js:71:64)
    at __webpack_require__ (http://localhost:6007/runtime~main.f4ce6b32bc79f7651537.bundle.js:782:30)
    at fn (http://localhost:6007/runtime~main.f4ce6b32bc79f7651537.bundle.js:150:20)
    at Module.<anonymous> (http://localhost:6007/main.f4ce6b32bc79f7651537.bundle.js:48:59)
    at Module../packages/timeModule/index-story.js (http://localhost:6007/main.f4ce6b32bc79f7651537.bundle.js:56:30)
```

When running without the `node_modules` folder inside of the module, it modifies moment's loading code in `vendors~main.######.js` to
```
/***/ "./node_modules/moment/moment.js":
/*!***************************************!*\
  !*** ./node_modules/moment/moment.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var require;//! moment.js

;(function (global, factory) {
     true ? module.exports = factory() :
    undefined
}(this, (function () { 'use strict';
```

# Steps To Reproduce
1. `git checkout working-without-lerna`
1. `npm install`
1. `npm start`
1. http://localhost:6007 should show the current time
1. `git checkout master`
1. `npm install`
1. `npm start`
1. http://localhost:6007 should show an error message