"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var createError = require('http-errors');
var BAD_REQUEST = require('../helpers/error').BAD_REQUEST;
var METHOD_TYPES = require('./../helpers/method_types');
var Password = require('../helpers/password');
var _a = require('../helpers/passport'), allowedFields = _a.allowedFields, signUser = _a.signUser;
var connection = require('../db').connection;
var passport = require('passport');
var Wallet = require('./../blockchain/wallet');
var txClient = require('./../blockchain/blmodule').txClient;
var login = {
    route: '/login',
    method: METHOD_TYPES.POST,
    fn: function (_a) {
        var _b = _a.body, email = _b.email, password = _b.password;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_c) {
                if (!email || !password) {
                    return [2 /*return*/, createError({
                            status: BAD_REQUEST,
                            message: "You didn't enter your email or password!",
                        })];
                }
                return [2 /*return*/, new Promise(function (res) {
                        passport.authenticate('local', { session: false }, function (error, user) {
                            if (error) {
                                res(error);
                            }
                            if (!user) {
                                return res(createError({
                                    status: BAD_REQUEST,
                                    message: 'Invalid email address or password!',
                                }));
                            }
                            console.log(user);
                            res(signUser(user));
                        })({
                            body: {
                                email: email,
                                password: password,
                            },
                        });
                    })];
            });
        });
    }
};
var profileRequiredFields = ['inn', 'name', 'address', 'mail_address', 'cpp', 'bank', 'settlement_account', 'correspondent_account', 'bic'];
var test = {
    route: '/test/:id',
    method: METHOD_TYPES.GET,
    fn: function (_a) {
        var id = _a.params.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var wallet, client, message, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        wallet = new Wallet("piece elbow winner sail replace embark rib collect priority coin type mansion roast ship census movie crucial hockey useless seminar visit expect mimic derive");
                        return [4 /*yield*/, wallet.init()];
                    case 1:
                        _b.sent();
                        console.log(wallet.getAddress());
                        return [4 /*yield*/, txClient(wallet.wallet)];
                    case 2:
                        client = _b.sent();
                        message = client.msgCreateContract({
                            creator: wallet.getAddress(),
                            contractHash: 'sdfdff',
                            buyer: 'test1'
                        });
                        return [4 /*yield*/, client.signAndBroadcast([message])];
                    case 3:
                        response = _b.sent();
                        console.log(response);
                        return [2 /*return*/];
                }
            });
        });
    }
};
var register = {
    route: '/register',
    method: METHOD_TYPES.POST,
    fn: function (_a) {
        var _b = _a.body, email = _b.email, password = _b.password, profileInfo = _b.profile;
        return __awaiter(void 0, void 0, void 0, function () {
            var otherUserEmail, wallet, profile_id, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!email) {
                            return [2 /*return*/, createError({
                                    status: BAD_REQUEST,
                                    message: "You didn't send email!"
                                })];
                        }
                        return [4 /*yield*/, connection('user').select('id').where({ email: email }).first()];
                    case 1:
                        otherUserEmail = _c.sent();
                        if (otherUserEmail) {
                            return [2 /*return*/, createError({
                                    status: CONFLICT,
                                    message: "An account with this email is already registered"
                                })];
                        }
                        if (!profile || profileRequiredFields.some(function (field) { return !profileInfo[field]; })) {
                            return [2 /*return*/, createError({
                                    status: BAD_REQUEST,
                                    message: 'You did not enter all the fields to create a profile!',
                                })];
                        }
                        wallet = new Wallet();
                        return [4 /*yield*/, wallet.init()];
                    case 2:
                        _c.sent();
                        publicAddress = wallet.getAddress();
                        profile_id = null;
                        user = null;
                        return [4 /*yield*/, connection.transaction(function (trx) { return __awaiter(void 0, void 0, void 0, function () {
                                var _a, _b;
                                var _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            ;
                                            return [4 /*yield*/, trx('profile')
                                                    .insert(__assign({}, profileInfo))
                                                    .returning('id')];
                                        case 1:
                                            profile_id = (_d.sent())[0];
                                            ;
                                            _b = (_a = trx('user'))
                                                .insert;
                                            _c = {
                                                email: email
                                            };
                                            return [4 /*yield*/, Password.hash(password)];
                                        case 2: return [4 /*yield*/, _b.apply(_a, [(_c.password = _d.sent(),
                                                    _c.profile_id = profile_id,
                                                    _c.public_address = wallet.getAddress(),
                                                    _c.mnemonic = wallet.mnemonic,
                                                    _c)])
                                                .returning(allowedFields)];
                                        case 3:
                                            user = (_d.sent())[0];
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, signUser(user)];
                }
            });
        });
    }
};
module.exports = {
    routes: {
        register: register,
        login: login,
        test: test,
    },
    route: '/auth',
};
//# sourceMappingURL=auth.js.map