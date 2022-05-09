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
var _a = require("./blmodule"), txClient = _a.txClient, queryClient = _a.queryClient, MissingWalletError = _a.MissingWalletError;
function initTxClient(vuexGetters) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, txClient(vuexGetters['common/wallet/signer'], {
                        addr: vuexGetters['common/env/apiTendermint']
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function initQueryClient(vuexGetters) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, queryClient({
                        addr: vuexGetters['common/env/apiCosmos']
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function sendMsgCreateAnnex(_a, _b) {
    var rootGetters = _a.rootGetters;
    var value = _b.value, _c = _b.fee, fee = _c === void 0 ? [] : _c, _d = _b.memo, memo = _d === void 0 ? '' : _d;
    return __awaiter(this, void 0, void 0, function () {
        var txClient_1, msg, result, e_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, initTxClient(rootGetters)];
                case 1:
                    txClient_1 = _e.sent();
                    return [4 /*yield*/, txClient_1.msgCreateAnnex(value)];
                case 2:
                    msg = _e.sent();
                    return [4 /*yield*/, txClient_1.signAndBroadcast([msg], { fee: { amount: fee,
                                gas: "200000" }, memo: memo })];
                case 3:
                    result = _e.sent();
                    return [2 /*return*/, result];
                case 4:
                    e_1 = _e.sent();
                    if (e_1 == MissingWalletError) {
                        throw new Error('TxClient:MsgCreateAnnex:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgCreateAnnex:Send Could not broadcast Tx: ' + e_1.message);
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function sendMsgCreateContract(_a, _b) {
    var rootGetters = _a.rootGetters;
    var value = _b.value, _c = _b.fee, fee = _c === void 0 ? [] : _c, _d = _b.memo, memo = _d === void 0 ? '' : _d;
    return __awaiter(this, void 0, void 0, function () {
        var txClient_2, msg, result, e_2;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, initTxClient(rootGetters)];
                case 1:
                    txClient_2 = _e.sent();
                    return [4 /*yield*/, txClient_2.msgCreateContract(value)];
                case 2:
                    msg = _e.sent();
                    return [4 /*yield*/, txClient_2.signAndBroadcast([msg], { fee: { amount: fee,
                                gas: "200000" }, memo: memo })];
                case 3:
                    result = _e.sent();
                    return [2 /*return*/, result];
                case 4:
                    e_2 = _e.sent();
                    if (e_2 == MissingWalletError) {
                        throw new Error('TxClient:MsgCreateContract:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgCreateContract:Send Could not broadcast Tx: ' + e_2.message);
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function sendMsgCompleteContract(_a, _b) {
    var rootGetters = _a.rootGetters;
    var value = _b.value, _c = _b.fee, fee = _c === void 0 ? [] : _c, _d = _b.memo, memo = _d === void 0 ? '' : _d;
    return __awaiter(this, void 0, void 0, function () {
        var txClient_3, msg, result, e_3;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, initTxClient(rootGetters)];
                case 1:
                    txClient_3 = _e.sent();
                    return [4 /*yield*/, txClient_3.msgCompleteContract(value)];
                case 2:
                    msg = _e.sent();
                    return [4 /*yield*/, txClient_3.signAndBroadcast([msg], { fee: { amount: fee,
                                gas: "200000" }, memo: memo })];
                case 3:
                    result = _e.sent();
                    return [2 /*return*/, result];
                case 4:
                    e_3 = _e.sent();
                    if (e_3 == MissingWalletError) {
                        throw new Error('TxClient:MsgCompleteContract:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgCompleteContract:Send Could not broadcast Tx: ' + e_3.message);
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function sendMsgSignAnnex(_a, _b) {
    var rootGetters = _a.rootGetters;
    var value = _b.value, _c = _b.fee, fee = _c === void 0 ? [] : _c, _d = _b.memo, memo = _d === void 0 ? '' : _d;
    return __awaiter(this, void 0, void 0, function () {
        var txClient_4, msg, result, e_4;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, initTxClient(rootGetters)];
                case 1:
                    txClient_4 = _e.sent();
                    return [4 /*yield*/, txClient_4.msgSignAnnex(value)];
                case 2:
                    msg = _e.sent();
                    return [4 /*yield*/, txClient_4.signAndBroadcast([msg], { fee: { amount: fee,
                                gas: "200000" }, memo: memo })];
                case 3:
                    result = _e.sent();
                    return [2 /*return*/, result];
                case 4:
                    e_4 = _e.sent();
                    if (e_4 == MissingWalletError) {
                        throw new Error('TxClient:MsgSignAnnex:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgSignAnnex:Send Could not broadcast Tx: ' + e_4.message);
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function sendMsgSignContract(_a, _b) {
    var rootGetters = _a.rootGetters;
    var value = _b.value, _c = _b.fee, fee = _c === void 0 ? [] : _c, _d = _b.memo, memo = _d === void 0 ? '' : _d;
    return __awaiter(this, void 0, void 0, function () {
        var txClient_5, msg, result, e_5;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, initTxClient(rootGetters)];
                case 1:
                    txClient_5 = _e.sent();
                    return [4 /*yield*/, txClient_5.msgSignContract(value)];
                case 2:
                    msg = _e.sent();
                    return [4 /*yield*/, txClient_5.signAndBroadcast([msg], { fee: { amount: fee,
                                gas: "200000" }, memo: memo })];
                case 3:
                    result = _e.sent();
                    return [2 /*return*/, result];
                case 4:
                    e_5 = _e.sent();
                    if (e_5 == MissingWalletError) {
                        throw new Error('TxClient:MsgSignContract:Init Could not initialize signing client. Wallet is required.');
                    }
                    else {
                        throw new Error('TxClient:MsgSignContract:Send Could not broadcast Tx: ' + e_5.message);
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map