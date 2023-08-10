"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 55:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoffeeController = void 0;
const common_1 = __webpack_require__(7);
let CoffeeController = exports.CoffeeController = class CoffeeController {
};
exports.CoffeeController = CoffeeController = __decorate([
    (0, common_1.Controller)('coffee')
], CoffeeController);


/***/ }),

/***/ 54:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoffeeModule = void 0;
const common_1 = __webpack_require__(7);
const coffee_controller_1 = __webpack_require__(55);
let CoffeeModule = exports.CoffeeModule = class CoffeeModule {
};
exports.CoffeeModule = CoffeeModule = __decorate([
    (0, common_1.Module)({
        controllers: [coffee_controller_1.CoffeeController]
    })
], CoffeeModule);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("feff816c09c057da2a37")
/******/ })();
/******/ 
/******/ }
;