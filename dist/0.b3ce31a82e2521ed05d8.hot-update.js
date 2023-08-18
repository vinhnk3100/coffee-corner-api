"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 56:
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CafeController = void 0;
const common_1 = __webpack_require__(7);
const cafe_service_1 = __webpack_require__(57);
const cafe_dto_1 = __webpack_require__(59);
const platform_express_1 = __webpack_require__(52);
const getCurrentUser_decorator_1 = __webpack_require__(33);
const HttpsCode_1 = __webpack_require__(20);
const role_decorator_1 = __webpack_require__(23);
let CafeController = exports.CafeController = class CafeController {
    constructor(cafeService) {
        this.cafeService = cafeService;
    }
    async findAllCafe() {
        try {
            const cafes = await this.cafeService.findAll();
            if (!cafes || cafes.length < 1) {
                return {
                    success: 'ok',
                    statusCode: HttpsCode_1.StatusCode.NOT_FOUND,
                    msg: 'There are currently not any suggest cafes right now',
                };
            }
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                cafes: cafes,
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
    async findOneById(cafeId) {
        try {
            const cafe = await this.cafeService.findById(cafeId);
            if (!cafe) {
                return {
                    success: 'ok',
                    statusCode: HttpsCode_1.StatusCode.NOT_FOUND,
                    msg: 'There are currently not any suggest cafes right now',
                };
            }
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                cafe: cafe,
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
    async createCafe(files, cafeDTO, userId) {
        try {
            const cafe = await this.cafeService.create(files, cafeDTO, userId);
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                msg: 'New suggest cafe has been created',
                cafe: cafe.cafe_name +
                    ' ' +
                    cafe.cafe_location.address +
                    ' ' +
                    cafe.cafe_location.district,
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
    async adminApproval(cafeId, cafeDTO) {
        try {
            const cafe = await this.cafeService.updateWithoutFiles(cafeId, cafeDTO);
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                msg: cafe.admin_approval === 0
                    ? `Admin has unapproved this cafe.`
                    : `Admin has approved this cafe.`,
                updateApproval: 'Admin approved',
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
    async thumbUpPost(userId, cafeId) {
        try {
            const cafeThumbUpEvent = await this.cafeService.updateThumbUp(cafeId, userId);
            if (!cafeThumbUpEvent) {
                return {
                    success: 'ok',
                    statusCode: HttpsCode_1.StatusCode.OK,
                    msg: `Thumb down cafe success`,
                };
            }
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                msg: `Thumb up cafe success`,
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
    async updateCafe(files, cafeId, cafeDTO) {
        try {
            console.log('Run at UpdateCafe');
            const updateCafe = await this.cafeService.update(files, cafeId, cafeDTO);
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                msg: `Update suggest cafe successfully`,
                updateCafe: updateCafe,
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
    async deleteCafe(cafeId) {
        try {
            const cafe = await this.cafeService.delete(cafeId);
            if (!cafe) {
                return {
                    success: 'ok',
                    statusCode: HttpsCode_1.StatusCode.NOT_FOUND,
                    msg: 'Invalid ID or cafe not found',
                };
            }
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                cafe: `Delete cafe ${"'" + cafe.cafe_name + "'"} success`,
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
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CafeController.prototype, "findAllCafe", null);
__decorate([
    (0, common_1.Get)(':cafeId'),
    __param(0, (0, common_1.Param)('cafeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CafeController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)('ADMIN', 'COFFEE OWNER'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'cafe_image' }])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, getCurrentUser_decorator_1.GetCurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_d = typeof cafe_dto_1.CafeDTO !== "undefined" && cafe_dto_1.CafeDTO) === "function" ? _d : Object, String]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CafeController.prototype, "createCafe", null);
__decorate([
    (0, common_1.Put)('/approve/:cafeId'),
    (0, role_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('cafeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof cafe_dto_1.CafeDTO !== "undefined" && cafe_dto_1.CafeDTO) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], CafeController.prototype, "adminApproval", null);
__decorate([
    (0, common_1.Put)('/action/thumbup/:cafeId'),
    __param(0, (0, getCurrentUser_decorator_1.GetCurrentUser)('id')),
    __param(1, (0, common_1.Param)('cafeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CafeController.prototype, "thumbUpPost", null);
__decorate([
    (0, common_1.Put)(':cafeId'),
    (0, role_decorator_1.Roles)('ADMIN', 'COFFEE OWNER'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'cafe_image' }])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('cafeId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, typeof (_h = typeof cafe_dto_1.CafeDTO !== "undefined" && cafe_dto_1.CafeDTO) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], CafeController.prototype, "updateCafe", null);
__decorate([
    (0, common_1.Delete)(':cafeId'),
    (0, role_decorator_1.Roles)('ADMIN', 'COFFEE OWNER'),
    __param(0, (0, common_1.Param)('cafeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CafeController.prototype, "deleteCafe", null);
exports.CafeController = CafeController = __decorate([
    (0, common_1.Controller)('api/cafe'),
    __metadata("design:paramtypes", [typeof (_a = typeof cafe_service_1.CafeService !== "undefined" && cafe_service_1.CafeService) === "function" ? _a : Object])
], CafeController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ba186f043ea91bf09b49")
/******/ })();
/******/ 
/******/ }
;