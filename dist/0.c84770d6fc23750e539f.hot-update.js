"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 16:
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const mongoose_1 = __webpack_require__(17);
const common_1 = __webpack_require__(6);
const mongoose_2 = __webpack_require__(14);
const user_schema_1 = __webpack_require__(18);
let UserService = exports.UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(userDTO) {
        const newUser = new this.userModel(userDTO);
        return await newUser.save();
    }
    async findAll() {
        return await this.userModel.find({}, ['-password']).populate('roles');
    }
    async findById(id) {
        return await this.userModel.findById(id).populate('roles').exec();
    }
    async findExisted(property, value) {
        return await this.userModel.findOne({ [property]: value }).exec();
    }
    async update(id, userDTO) {
        console.log(userDTO);
        return await this.userModel
            .findByIdAndUpdate({ _id: id }, { $set: userDTO.roles }, { upsert: true, new: true })
            .select(['-password']);
    }
    async delete(id) {
        return await this.userModel.findByIdAndRemove(id);
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], UserService);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8b14e3c2685a978affc9")
/******/ })();
/******/ 
/******/ }
;