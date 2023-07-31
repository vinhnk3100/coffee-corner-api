"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 10:
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(6);
const user_dto_1 = __webpack_require__(11);
const HttpsCode_1 = __webpack_require__(19);
const user_service_1 = __webpack_require__(16);
const auth_utils_1 = __webpack_require__(20);
const roles_guard_1 = __webpack_require__(22);
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll() {
        try {
            const users = await this.userService.findAll();
            if (!users || users.length <= 0) {
                return {
                    success: 'ok',
                    statusCode: HttpsCode_1.StatusCode.NOT_FOUND,
                    users: 'User not available right now',
                };
            }
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                user: users,
            };
        }
        catch (error) {
            return {
                success: 'false',
                statusCode: HttpsCode_1.StatusCode.BAD_REQUEST,
                msg: `No user available right now`,
            };
        }
    }
    async findOne(id) {
        try {
            const user = await this.userService.findById(id);
            if (!user) {
                return {
                    success: 'ok',
                    statusCode: HttpsCode_1.StatusCode.NOT_FOUND,
                    user: 'User ID is invalid or not existed',
                };
            }
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                user: user,
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async createUser(userDTO) {
        try {
            const password = userDTO.password;
            const newUser = { ...userDTO, password: await (0, auth_utils_1.hashPassword)(password) };
            await this.userService.create(newUser);
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                msg: `Create user ${userDTO.username} successfully`,
                user: newUser,
            };
        }
        catch (error) {
            return {
                success: 'false',
                statusCode: HttpsCode_1.StatusCode.BAD_REQUEST,
                msg: error.message,
            };
        }
    }
    async updateUser(id, userDTO) {
        try {
            console.log(userDTO);
            await this.userService.update(id, userDTO);
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                msg: `Update user ${id} successfully`,
            };
        }
        catch (e) {
            return {
                success: 'false',
                statusCode: HttpsCode_1.StatusCode.BAD_REQUEST,
                err: e.message,
            };
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.userService.delete(id);
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                msg: `User ${id} delete successfully`,
                user: user,
            };
        }
        catch (e) {
            return {
                success: 'false',
                statusCode: HttpsCode_1.StatusCode.BAD_REQUEST,
                err: e.message,
            };
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof user_dto_1.UserDTO !== "undefined" && user_dto_1.UserDTO) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_e = typeof user_dto_1.UserDTO !== "undefined" && user_dto_1.UserDTO) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('api/user'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("04b267e52e7fe96a8acb")
/******/ })();
/******/ 
/******/ }
;