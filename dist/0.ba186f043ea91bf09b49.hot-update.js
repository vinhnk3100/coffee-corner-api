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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostController = void 0;
const common_1 = __webpack_require__(7);
const post_service_1 = __webpack_require__(49);
const HttpsCode_1 = __webpack_require__(20);
const post_dto_1 = __webpack_require__(50);
const platform_express_1 = __webpack_require__(52);
const isPostOwner_1 = __webpack_require__(53);
const getCurrentUser_decorator_1 = __webpack_require__(33);
let PostController = exports.PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async findAll() {
        try {
            const posts = await this.postService.findAll();
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
    async findOne(postId) {
        try {
            const post = await this.postService.findOneById(postId);
            if (!post || post.length <= 0) {
                return {
                    success: 'ok',
                    statusCode: HttpsCode_1.StatusCode.NOT_FOUND,
                    users: 'Invalid post ID or post not existed',
                };
            }
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                post: post,
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
    async createPost(files, userId, postDTO) {
        try {
            const newPost = await this.postService.create(files, postDTO, userId);
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                msg: `Create post successfully`,
                post: newPost,
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
    async thumbUpPost(userId, postId) {
        try {
            const postThumbUpEvent = await this.postService.updateThumbUp(postId, userId);
            console.log(postThumbUpEvent);
            if (!postThumbUpEvent) {
                return {
                    success: 'ok',
                    statusCode: HttpsCode_1.StatusCode.OK,
                    msg: `Thumb down post success`,
                };
            }
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                msg: `Thumb up post success`,
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
    async updatePost(postId, files, postDTO) {
        try {
            const updatePost = await this.postService.update(postId, files, postDTO);
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                msg: `Update post ${postId} successfully`,
                updatePost: updatePost,
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
    async deletePost(postId) {
        try {
            const post = await this.postService.delete(postId);
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                msg: `Delete post ${postId} successfully`,
                post: post,
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
], PostController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':postId'),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PostController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'content_img' }])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, getCurrentUser_decorator_1.GetCurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, typeof (_d = typeof post_dto_1.PostDTO !== "undefined" && post_dto_1.PostDTO) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Put)('/action/thumbup/:postId'),
    __param(0, (0, getCurrentUser_decorator_1.GetCurrentUser)('id')),
    __param(1, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PostController.prototype, "thumbUpPost", null);
__decorate([
    (0, common_1.Put)(':postId'),
    (0, isPostOwner_1.IsPostOwner)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'content_img' }])),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, typeof (_g = typeof post_dto_1.PostDTO !== "undefined" && post_dto_1.PostDTO) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], PostController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)(':postId'),
    (0, isPostOwner_1.IsPostOwner)(),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], PostController.prototype, "deletePost", null);
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
/******/ 	__webpack_require__.h = () => ("d7796f9546219084c38b")
/******/ })();
/******/ 
/******/ }
;