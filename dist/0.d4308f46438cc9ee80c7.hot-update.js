"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 11:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserDTO = void 0;
const class_validator_1 = __webpack_require__(12);
const validation_utils_1 = __webpack_require__(15);
class UserDTO {
}
exports.UserDTO = UserDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDTO.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.MinLength)(5),
    (0, validation_utils_1.Unique)(),
    __metadata("design:type", String)
], UserDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], UserDTO.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, validation_utils_1.Unique)(),
    __metadata("design:type", String)
], UserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDTO.prototype, "status_bio", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserDTO.prototype, "date_of_birth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDTO.prototype, "self_description", void 0);
__decorate([
    (0, class_validator_1.Matches)(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)),
    __metadata("design:type", String)
], UserDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], UserDTO.prototype, "roles", void 0);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f51c8ce4248c5feba108")
/******/ })();
/******/ 
/******/ }
;