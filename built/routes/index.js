"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a = require('../helpers/error'), isError = _a.isError, SERVER_ERROR = _a.SERVER_ERROR;
var router = require('express').Router();
var handleError = function (res, error) {
    res.status(error.status || SERVER_ERROR).json({
        ok: false,
        result: {
            error: error.message,
        },
    });
};
function addRouter(_a) {
    var _this = this;
    var routes = _a.routes, route = _a.route;
    var router = require('express').Router();
    var _loop_1 = function (key) {
        var _b = routes[key], method = _b.method, subRoute = _b.route, fn = _b.fn, auth = _b.auth, _c = _b.middlewares, middlewares = _c === void 0 ? [] : _c;
        var isAuth = auth !== undefined;
        console.log("".concat(method, " ").concat(route).concat(subRoute));
        if (isAuth) {
            middlewares.unshift(passport.authenticate('jwt', { session: false }));
        }
        console.log(middlewares);
        router[method].apply(router, __spreadArray(__spreadArray([subRoute], middlewares, false), [function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fn({ body: req.body, user: req.user, params: req.params, query: req.query, token: req.token, files: req.files })];
                        case 1:
                            result = _a.sent();
                            if (isError(result)) {
                                handleError(res, result);
                            }
                            else {
                                res.json({
                                    ok: true,
                                    result: result === undefined ? null : result,
                                });
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error("".concat(method, " ").concat(route).concat(subRoute, " error: "), error_1);
                            if (isError(error_1))
                                return [2 /*return*/, handleError(res, error_1)];
                            return [2 /*return*/, res.status(SERVER_ERROR).json({
                                    ok: false,
                                    result: {
                                        error: 'Unknown error',
                                    },
                                })];
                        case 3: return [2 /*return*/];
                    }
                });
            }); }], false));
    };
    for (var key in routes) {
        _loop_1(key);
    }
    return { router: router, route: route };
}
router.get('/', function (req, res) {
    res.json(true);
});
var routes = [
    require('./auth')
];
routes.map(addRouter).forEach(function (_a) {
    var subRouter = _a.router, route = _a.route;
    return router.use(route, subRouter);
});
module.exports = router;
//# sourceMappingURL=index.js.map