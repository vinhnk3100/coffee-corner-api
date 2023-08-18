"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 57:
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CafeService = void 0;
const common_1 = __webpack_require__(7);
const mongoose_1 = __webpack_require__(15);
const cafe_schema_1 = __webpack_require__(58);
const mongoose_2 = __webpack_require__(18);
const user_service_1 = __webpack_require__(17);
let CafeService = exports.CafeService = class CafeService {
    constructor(cafeModel, userService) {
        this.cafeModel = cafeModel;
        this.userService = userService;
    }
    async findAll() {
        return await this.cafeModel
            .find({})
            .populate({
            path: 'comments',
            populate: { path: 'ownerId', select: 'username' },
        })
            .lean()
            .exec();
    }
    async findById(cafeId) {
        return await this.cafeModel
            .findById(cafeId)
            .populate({
            path: 'comments',
            populate: { path: 'ownerId', select: 'username' },
        })
            .lean()
            .exec();
    }
    async create(files, cafeDTO, userId) {
        const listContentImage = [];
        let currentUserIsAdmin = 0;
        const user = await this.userService.findById(userId);
        user.roles.map((role) => {
            if (role === 'ADMIN')
                currentUserIsAdmin = 1;
        });
        if (files.cafe_image) {
            files.cafe_image.map((i) => {
                return listContentImage.push(i.originalname);
            });
        }
        const newPost = new this.cafeModel({
            ...cafeDTO,
            status_open: cafeDTO.status_open,
            admin_approval: currentUserIsAdmin ? '0' : '1',
            cafe_image: listContentImage,
            thumb_up: [],
        });
        return await newPost.save();
    }
    async update(files, cafeId, cafeDTO) {
        const listContentImage = [];
        if (files.cafe_image) {
            files.cafe_image.map((i) => {
                return listContentImage.push(i.originalname);
            });
        }
        const newCafe = {
            ...cafeDTO,
            cafe_image: listContentImage,
        };
        return await this.cafeModel.findByIdAndUpdate({ _id: cafeId }, { $set: newCafe }, { new: true });
    }
    async updateComment(cafeId, commentId) {
        const commentIdList = [];
        const cafe = await this.cafeModel.findById(cafeId);
        if (!cafe) {
            throw new common_1.NotFoundException('Invalid cafe ID or cafe not existed');
        }
        cafe.comments?.map((comment) => {
            commentIdList.push(comment.toString());
        });
        await this.cafeModel.findByIdAndUpdate({ _id: cafeId }, commentIdList.length > 0 && commentIdList.includes(commentId)
            ? { $pull: { comments: commentId } }
            : { $push: { comments: commentId } }, { new: true });
        return;
    }
    async updateThumbUp(cafeId, userId) {
        const userList = [];
        const cafe = await this.cafeModel.findById(cafeId);
        if (!cafe) {
            throw new common_1.NotFoundException('Invalid cafe ID or cafe not existed');
        }
        cafe.thumb_up?.map((user) => {
            userList.push(user.toString());
        });
        await this.cafeModel.findByIdAndUpdate({ _id: cafeId }, userList.length > 0 && userList.includes(userId)
            ? { $pull: { thumb_up: userId } }
            : { $push: { thumb_up: userId } }, { new: true });
        return 1;
    }
    async updateWithoutFiles(cafeId, cafeDTO) {
        return await this.cafeModel.findByIdAndUpdate({ _id: cafeId }, { $set: cafeDTO }, { new: true });
    }
    async delete(cafeId) {
        return await this.cafeModel.findByIdAndRemove(cafeId).exec();
    }
};
exports.CafeService = CafeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cafe_schema_1.Cafe.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], CafeService);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b3ce31a82e2521ed05d8")
/******/ })();
/******/ 
/******/ }
;