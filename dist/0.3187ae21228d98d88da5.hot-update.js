"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 6:
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
const isPostOwner_guard_1 = __webpack_require__(53);
const location_controller_1 = __webpack_require__(54);
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
        controllers: [app_controller_1.AppController, location_controller_1.LocationController],
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
            {
                provide: core_1.APP_GUARD,
                useClass: isPostOwner_guard_1.IsPostOwnerGuard,
            },
        ],
    })
], AppModule);


/***/ }),

/***/ 54:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocationController = void 0;
const common_1 = __webpack_require__(7);
let LocationController = exports.LocationController = class LocationController {
};
exports.LocationController = LocationController = __decorate([
    (0, common_1.Controller)('location')
], LocationController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ba6dbf4ec11548adcfbb")
/******/ })();
/******/ 
/******/ }
;