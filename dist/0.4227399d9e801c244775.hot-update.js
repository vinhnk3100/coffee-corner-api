"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 48:
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostController = void 0;
const common_1 = __webpack_require__(7);
const post_service_1 = __webpack_require__(49);
const HttpsCode_1 = __webpack_require__(20);
const post_dto_1 = __webpack_require__(50);
const platform_express_1 = __webpack_require__(52);
let PostController = exports.PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async findAll() {
        try {
            const posts = await this.postService.findAll();
            console.log(posts);
            if (!posts || posts.length <= 0) {
                return {
                    success: 'ok',
                    statusCode: HttpsCode_1.StatusCode.NOT_FOUND,
                    users: 'Post not available right now',
                };
            }
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                posts: posts,
            };
        }
        catch (error) {
            return {
                success: 'false',
                statusCode: HttpsCode_1.StatusCode.BAD_REQUEST,
                msg: `No post available right now`,
            };
        }
    }
    async createPost(files, postDTO) {
        try {
            await this.postService.create(files, postDTO);
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
], PostController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'content_img' },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof post_dto_1.PostDTO !== "undefined" && post_dto_1.PostDTO) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PostController.prototype, "createPost", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('api/post'),
    __metadata("design:paramtypes", [typeof (_a = typeof post_service_1.PostService !== "undefined" && post_service_1.PostService) === "function" ? _a : Object])
], PostController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("245d0f43864ca2bcf62f")
/******/ })();
/******/ 
/******/ }
;