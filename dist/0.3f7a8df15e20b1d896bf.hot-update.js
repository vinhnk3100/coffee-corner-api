"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = [
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(4);
const core_1 = __webpack_require__(5);
const app_module_1 = __webpack_require__(6);
const class_validator_1 = __webpack_require__(13);
const common_1 = __webpack_require__(7);
async function bootstrap() {
    const appOptions = { cors: true };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, appOptions);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: true,
        validationError: { value: false },
    }));
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    await app.listen(process.env.PORT, () => console.log(`App listening on port 8080!`));
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(7);
const app_controller_1 = __webpack_require__(8);
const app_service_1 = __webpack_require__(9);
const users_module_1 = __webpack_require__(10);
const config_1 = __webpack_require__(24);
const mongoose_1 = __webpack_require__(15);
const auth_module_1 = __webpack_require__(25);
const role_module_1 = __webpack_require__(40);
const accessToken_guard_1 = __webpack_require__(44);
const core_1 = __webpack_require__(5);
const role_guard_1 = __webpack_require__(45);
const post_module_1 = __webpack_require__(46);
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env'],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: () => ({
                    uri: process.env.DB_URI,
                    ssl: true,
                    useUnifiedTopology: true,
                    useNewUrlParser: true,
                }),
            }),
            users_module_1.UserModule,
            auth_module_1.AuthModule,
            role_module_1.RoleModule,
            post_module_1.PostModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: accessToken_guard_1.AccessTokenGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);


/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
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
const common_1 = __webpack_require__(7);
const user_dto_1 = __webpack_require__(12);
const HttpsCode_1 = __webpack_require__(20);
const user_service_1 = __webpack_require__(17);
const auth_utils_1 = __webpack_require__(21);
const role_decorator_1 = __webpack_require__(23);
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
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UserController.prototype, "findAll", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
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
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_e = typeof user_dto_1.UserDTO !== "undefined" && user_dto_1.UserDTO) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
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


/***/ }),
/* 12 */
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserDTO = void 0;
const class_validator_1 = __webpack_require__(13);
const role_schema_1 = __webpack_require__(14);
const validation_utils_1 = __webpack_require__(16);
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
    (0, class_validator_1.IsString)(),
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
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", typeof (_b = typeof role_schema_1.Role !== "undefined" && role_schema_1.Role) === "function" ? _b : Object)
], UserDTO.prototype, "roles", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDTO.prototype, "refreshToken", void 0);


/***/ }),
/* 13 */,
/* 14 */
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleSchema = exports.Role = void 0;
const mongoose_1 = __webpack_require__(15);
let Role = exports.Role = class Role {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Role.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Role.prototype, "role_desc", void 0);
exports.Role = Role = __decorate([
    (0, mongoose_1.Schema)()
], Role);
exports.RoleSchema = mongoose_1.SchemaFactory.createForClass(Role);


/***/ }),
/* 15 */,
/* 16 */,
/* 17 */
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
const mongoose_1 = __webpack_require__(18);
const common_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(15);
const user_schema_1 = __webpack_require__(19);
let UserService = exports.UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(userDTO) {
        const newUser = new this.userModel(userDTO);
        return await newUser.save();
    }
    async findAll() {
        return await this.userModel.find({}, ['-password']).lean().exec();
    }
    async findById(id) {
        return await this.userModel.findById(id).populate('roles').lean().exec();
    }
    async findExisted(property, value) {
        return await this.userModel
            .findOne({ [property]: value })
            .lean()
            .exec();
    }
    async update(id, userDTO) {
        return await this.userModel
            .findByIdAndUpdate({ _id: id }, { $set: userDTO }, { new: true })
            .select(['-password']);
    }
    async updateRefreshToken(id, refreshToken) {
        return await this.userModel.updateMany({ _id: id }, { refreshToken: refreshToken }, {
            new: true,
        });
    }
    async delete(id) {
        return await this.userModel.findByIdAndDelete(id).exec();
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], UserService);


/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = void 0;
const common_1 = __webpack_require__(7);
const Roles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.Roles = Roles;


/***/ }),
/* 24 */,
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const dotenv = __webpack_require__(4);
dotenv.config();
const common_1 = __webpack_require__(7);
const auth_controller_1 = __webpack_require__(26);
const auth_service_1 = __webpack_require__(27);
const users_module_1 = __webpack_require__(10);
const passport_1 = __webpack_require__(31);
const local_strategy_1 = __webpack_require__(35);
const jwt_1 = __webpack_require__(28);
const accessToken_strategy_1 = __webpack_require__(37);
const refreshToken_strategy_1 = __webpack_require__(39);
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET_KEY,
                signOptions: { expiresIn: '60s' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            accessToken_strategy_1.AccessTokenStrategy,
            refreshToken_strategy_1.RefreshTokenStrategy,
        ],
    })
], AuthModule);


/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
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
exports.LocalStrategy = void 0;
const passport_local_1 = __webpack_require__(36);
const passport_1 = __webpack_require__(31);
const common_1 = __webpack_require__(7);
const auth_service_1 = __webpack_require__(27);
const HttpsCode_1 = __webpack_require__(20);
let LocalStrategy = exports.LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    async validate(username, rawPassword) {
        const user = await this.authService.validateUser(username, rawPassword);
        if (!user) {
            return {
                success: 'false',
                statusCode: HttpsCode_1.StatusCode.UNAUTHORIZED,
                msg: 'Username or password is not existed or incorrect',
            };
        }
        return user;
    }
};
exports.LocalStrategy = LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);


/***/ }),
/* 36 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 37 */,
/* 38 */,
/* 39 */
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenStrategy = void 0;
const passport_1 = __webpack_require__(31);
const passport_jwt_1 = __webpack_require__(38);
const common_1 = __webpack_require__(7);
let RefreshTokenStrategy = exports.RefreshTokenStrategy = class RefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallBack: true,
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }
    validate(payload) {
        return payload;
    }
};
exports.RefreshTokenStrategy = RefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RefreshTokenStrategy);


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleModule = void 0;
const common_1 = __webpack_require__(7);
const mongoose_1 = __webpack_require__(15);
const role_schema_1 = __webpack_require__(14);
const role_controller_1 = __webpack_require__(41);
const role_service_1 = __webpack_require__(42);
let RoleModule = exports.RoleModule = class RoleModule {
};
exports.RoleModule = RoleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: role_schema_1.Role.name, schema: role_schema_1.RoleSchema }]),
        ],
        controllers: [role_controller_1.RoleController],
        providers: [role_service_1.RoleService],
        exports: [role_service_1.RoleService],
    })
], RoleModule);


/***/ }),
/* 41 */
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
exports.RoleController = void 0;
const common_1 = __webpack_require__(7);
const role_service_1 = __webpack_require__(42);
const role_dto_1 = __webpack_require__(43);
const HttpsCode_1 = __webpack_require__(20);
let RoleController = exports.RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async findAll() {
        try {
            const roles = await this.roleService.findAll();
            if (!roles || roles.length <= 0) {
                return {
                    success: 'ok',
                    statusCode: HttpsCode_1.StatusCode.NOT_FOUND,
                    roles: 'Role not available right now',
                };
            }
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                roles: roles,
            };
        }
        catch (error) {
            return {
                success: 'false',
                statusCode: HttpsCode_1.StatusCode.BAD_REQUEST,
                msg: `No role available right now`,
            };
        }
    }
    async createRole(roleDTO) {
        try {
            await this.roleService.create(roleDTO);
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                msg: `Create role ${roleDTO.role} successfully`,
            };
        }
        catch (e) {
            return {
                success: 'false',
                statusCode: HttpsCode_1.StatusCode.BAD_REQUEST,
                msg: e.message,
            };
        }
    }
    async updateRole(id, roleDTO) {
        try {
            await this.roleService.update(id, roleDTO);
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                msg: `Update role ${roleDTO.role} successfully`,
            };
        }
        catch (e) {
            return {
                success: 'false',
                statusCode: HttpsCode_1.StatusCode.BAD_REQUEST,
                msg: e.message,
            };
        }
    }
    async deleteRole(id, roleDTO) {
        try {
            await this.roleService.delete(id);
            return {
                success: 'ok',
                statusCode: HttpsCode_1.StatusCode.OK,
                msg: `Delete role ${roleDTO.role} successfully`,
            };
        }
        catch (e) {
            return {
                success: 'false',
                statusCode: HttpsCode_1.StatusCode.BAD_REQUEST,
                msg: e.message,
            };
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], RoleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof role_dto_1.RoleDTO !== "undefined" && role_dto_1.RoleDTO) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], RoleController.prototype, "createRole", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_e = typeof role_dto_1.RoleDTO !== "undefined" && role_dto_1.RoleDTO) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], RoleController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_g = typeof role_dto_1.RoleDTO !== "undefined" && role_dto_1.RoleDTO) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], RoleController.prototype, "deleteRole", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.Controller)('api/role'),
    __metadata("design:paramtypes", [typeof (_a = typeof role_service_1.RoleService !== "undefined" && role_service_1.RoleService) === "function" ? _a : Object])
], RoleController);


/***/ }),
/* 42 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleService = void 0;
const mongoose_1 = __webpack_require__(18);
const common_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(15);
const role_schema_1 = __webpack_require__(14);
const role_dto_1 = __webpack_require__(43);
const role_decorator_1 = __webpack_require__(23);
let RoleService = exports.RoleService = class RoleService {
    constructor(roleModel) {
        this.roleModel = roleModel;
    }
    async findAll() {
        return await this.roleModel.find({}).lean().exec();
    }
    async findById(id) {
        return await this.roleModel.findById(id).lean().exec();
    }
    async create(roleDTO) {
        const newRole = new this.roleModel(roleDTO);
        return await newRole.save();
    }
    async update(id, roleDTO) {
        return await this.roleModel
            .findByIdAndUpdate({ _id: id }, { $set: roleDTO }, { new: true })
            .exec();
    }
    async delete(id) {
        return await this.roleModel.findByIdAndDelete(id).exec();
    }
};
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], RoleService.prototype, "findAll", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof role_schema_1.Role !== "undefined" && role_schema_1.Role) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], RoleService.prototype, "findById", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof role_dto_1.RoleDTO !== "undefined" && role_dto_1.RoleDTO) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], RoleService.prototype, "create", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof role_schema_1.Role !== "undefined" && role_schema_1.Role) === "function" ? _g : Object, typeof (_h = typeof role_dto_1.RoleDTO !== "undefined" && role_dto_1.RoleDTO) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], RoleService.prototype, "update", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof role_schema_1.Role !== "undefined" && role_schema_1.Role) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], RoleService.prototype, "delete", null);
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], RoleService);


/***/ }),
/* 43 */
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
exports.RoleDTO = void 0;
const class_validator_1 = __webpack_require__(13);
const user_schema_1 = __webpack_require__(19);
class RoleDTO {
}
exports.RoleDTO = RoleDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoleDTO.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoleDTO.prototype, "role_desc", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", typeof (_a = typeof user_schema_1.User !== "undefined" && user_schema_1.User) === "function" ? _a : Object)
], RoleDTO.prototype, "users", void 0);


/***/ }),
/* 44 */,
/* 45 */
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
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(7);
const core_1 = __webpack_require__(5);
let RolesGuard = exports.RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const roles = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return this.validateRoles(roles, user.roles);
    }
    validateRoles(roles, userRoles) {
        return roles.some((role) => userRoles.includes(role));
    }
};
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostModule = void 0;
const common_1 = __webpack_require__(7);
const mongoose_1 = __webpack_require__(15);
const post_schema_1 = __webpack_require__(47);
const post_controller_1 = __webpack_require__(48);
const post_service_1 = __webpack_require__(49);
let PostModule = exports.PostModule = class PostModule {
};
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: post_schema_1.Post.name, schema: post_schema_1.PostSchema }]),
        ],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService],
        exports: [post_service_1.PostService],
    })
], PostModule);


/***/ }),
/* 47 */
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
exports.PostSchema = exports.Post = void 0;
const mongoose_1 = __webpack_require__(15);
const mongoose_2 = __webpack_require__(18);
const user_schema_1 = __webpack_require__(19);
let Post = exports.Post = class Post {
};
__decorate([
    (0, mongoose_1.Prop)({ type: Buffer }),
    __metadata("design:type", Object)
], Post.prototype, "thumbnail", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Buffer }),
    __metadata("design:type", Array)
], Post.prototype, "content_img", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", typeof (_a = typeof user_schema_1.User !== "undefined" && user_schema_1.User) === "function" ? _a : Object)
], Post.prototype, "userId", void 0);
exports.Post = Post = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Post);
exports.PostSchema = mongoose_1.SchemaFactory.createForClass(Post);


/***/ }),
/* 48 */
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


/***/ }),
/* 49 */
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
            thumbnail: files.thumbnail,
            title: postDTO.title,
            content: postDTO.content,
            price: postDTO.price,
            content_img: files.thumbnail,
            rating: postDTO.rating,
            userId: postDTO.userId,
        });
        console.log('Create new Post: ', newPost);
        return await newPost.save();
    }
};
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], PostService);


/***/ }),
/* 50 */
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
exports.PostDTO = void 0;
const class_validator_1 = __webpack_require__(13);
const file_decorator_1 = __webpack_require__(51);
const user_schema_1 = __webpack_require__(19);
class PostDTO {
}
exports.PostDTO = PostDTO;
__decorate([
    (0, file_decorator_1.IsFile)({ mime: ['image/jpg', 'image/png'] }),
    __metadata("design:type", Object)
], PostDTO.prototype, "thumbnail", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostDTO.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostDTO.prototype, "price", void 0);
__decorate([
    (0, file_decorator_1.IsFile)({ mime: ['image/jpg', 'image/png'] }),
    __metadata("design:type", Object)
], PostDTO.prototype, "content_img", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PostDTO.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", typeof (_a = typeof user_schema_1.User !== "undefined" && user_schema_1.User) === "function" ? _a : Object)
], PostDTO.prototype, "userId", void 0);


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsFile = void 0;
const class_validator_1 = __webpack_require__(13);
function IsFile(options, validationOptions) {
    return function (object, propertyName) {
        return (0, class_validator_1.registerDecorator)({
            name: 'isFile',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    if (value?.mimetype &&
                        (options?.mime ?? []).includes(value?.mimetype)) {
                        return true;
                    }
                    return false;
                },
            },
        });
    };
}
exports.IsFile = IsFile;


/***/ }),
/* 52 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ })
];
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7d1f4677b93516240bec")
/******/ })();
/******/ 
/******/ }
;