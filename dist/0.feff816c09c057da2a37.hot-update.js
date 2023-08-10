"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

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
const coffee_service_1 = __webpack_require__(56);
let CoffeeModule = exports.CoffeeModule = class CoffeeModule {
};
exports.CoffeeModule = CoffeeModule = __decorate([
    (0, common_1.Module)({
        controllers: [coffee_controller_1.CoffeeController],
        providers: [coffee_service_1.CoffeeService]
    })
], CoffeeModule);


/***/ }),

/***/ 56:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoffeeService = void 0;
const common_1 = __webpack_require__(7);
let CoffeeService = exports.CoffeeService = class CoffeeService {
};
exports.CoffeeService = CoffeeService = __decorate([
    (0, common_1.Injectable)()
], CoffeeService);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("fbac5dd49a41cd893165")
/******/ })();
/******/ 
/******/ }
;