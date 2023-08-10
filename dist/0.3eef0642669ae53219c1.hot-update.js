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
        return await this.postModel
            .find()
            .populate('userId', 'avatar username')
            .lean()
            .exec();
    }
    async findOneById(postId) {
        return await this.postModel
            .findById(postId)
            .populate('userId', 'avatar username')
            .lean()
            .exec();
    }
    async create(files, postDTO, userId) {
        const listContentImage = [];
        files.content_img.map((i) => {
            return listContentImage.push(i.originalname);
        });
        const newPost = new this.postModel({
            title: postDTO.title,
            content: postDTO.content,
            price: postDTO.price,
            content_img: listContentImage,
            thumb_up: [],
            userId: userId,
        });
        return await newPost.save();
    }
    async update(postId, files, postDTO) {
        const post = await this.postModel.findById(postId);
        if (!post) {
            throw new common_1.NotFoundException('Invalid post ID or post not existed');
        }
        let newUpdatePost = {};
        const listContentImage = [];
        if (files.content_img) {
            files.content_img.map((i) => {
                return listContentImage.push(i.originalname);
            });
        }
        newUpdatePost = {
            title: postDTO.title,
            content: postDTO.content,
            price: postDTO.price,
            content_img: files.content_img ? listContentImage : undefined,
            thumb_up: postDTO.thumb_up,
        };
        if (postDTO.thumb_up) {
            throw new Error('You cannot change vote');
        }
        return await this.postModel.findByIdAndUpdate({ _id: postId }, { $set: newUpdatePost }, { new: true });
    }
    async updateThumbUp(postId, userId) {
        const userList = [];
        const post = await this.postModel.findById(postId);
        if (!post) {
            throw new common_1.NotFoundException('Invalid post ID or post not existed');
        }
        post.thumb_up?.map((user) => {
            userList.push(user.toString());
        });
        await this.postModel.findByIdAndUpdate({ _id: postId }, userList.length > 0 && userList.includes(userId)
            ? { $pull: { thumb_up: userId } }
            : { $push: { thumb_up: userId } }, { new: true });
        return 1;
    }
    async delete(postId) {
        return await this.postModel.findByIdAndRemove(postId);
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
/******/ 	__webpack_require__.h = () => ("4f6f5905cbca14f57009")
/******/ })();
/******/ 
/******/ }
;