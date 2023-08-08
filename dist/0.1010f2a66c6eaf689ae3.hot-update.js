"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 49:
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
exports.PostService = void 0;
const common_1 = __webpack_require__(7);
const mongoose_1 = __webpack_require__(15);
const mongoose_2 = __webpack_require__(18);
const post_schema_1 = __webpack_require__(47);
let PostService = exports.PostService = class PostService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async findAll() {
        return await this.postModel.find({}).lean().exec();
    }
    async findById(id) {
        return await this.postModel.findById(id).populate('userId').lean().exec();
    }
    async create(files, postDTO) {
        const newPost = new this.postModel({
            thumbnail: files.thumbnail.buffer,
            title: postDTO.title,
            content: postDTO.content,
            price: postDTO.price,
            content_img: files.thumbnail.buffer,
            rating: postDTO.rating,
            userId: postDTO.userId,
        });
        console.log('Create new Post: ', newPost);
    }
};
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], PostService);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8e2a25d6ff365f514241")
/******/ })();
/******/ 
/******/ }
;