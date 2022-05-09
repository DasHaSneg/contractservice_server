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
var METHOD_TYPES = require("../helpers/method_types");
var DOC_TYPES = require("../helpers/types");
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var getContracts = {
    route: '/',
    methid: METHOD_TYPES.GET,
    auth: true,
    fn: function (_a) {
        var id = _a.user.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var query, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = connection('contract_party')
                            .select(['contract.id', 'type', 'date_started', 'date_created', 'blcontract_id', 'json', 'src'])
                            .join('contract', { 'contract_party.contract_id': 'contract.id' })
                            .where({ profile_id: id });
                        return [4 /*yield*/, query];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    }
};
var getSides = {
    route: '/:id/sides',
    method: METHOD_TYPES.GET,
    auth: true,
    fn: function (_a) {
        var id = _a.params.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var sides;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, connection('contract_party')
                            .select([
                            'profile.id',
                            'profile.name',
                            'profile.address',
                            'profile.mailling_address',
                            'profile.inn',
                            'profile.cpp',
                            'profile.bank',
                            'profile.settlement_account',
                            'profile.corresponded_account',
                            'profile.bic'
                        ])
                            .join('profile', { 'contract_party.profile_id': 'profile.id' })
                            .where({
                            contract_id: id
                        })];
                    case 1:
                        sides = _b.sent();
                        return [2 /*return*/, sides];
                }
            });
        });
    },
};
var getContract = {
    route: '/:id',
    method: METHOD_TYPES.GET,
    auth: true,
    fn: function (_a) {
        var id = _a.params.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var contracts;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, connection('contract')
                            .select(['id', 'date_started', 'date_created', 'blcontract_id', 'json', 'src'])
                            .whereIn('id', id.split(','))];
                    case 1:
                        contracts = _b.sent();
                        return [2 /*return*/, contracts];
                }
            });
        });
    },
};
var addContract = {
    route: '/',
    method: METHOD_TYPES.POST,
    auth: true,
    fn: function (_a) {
        var _b = _a.user, user_id = _b.id, profile_id = _b.profile_id, buyer_profile_id = _a.body.buyer_profile_id, contract = _a.files.contract;
        return __awaiter(void 0, void 0, void 0, function () {
            var randomStr, fullLink, fileName;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        randomStr = crypto.randomBytes(4).toString('hex');
                        fullLink = "public/contracts/".concat(Date.now(), "/").concat(user_id, "/").concat(randomStr);
                        return [4 /*yield*/, fs.promises.mkdir(fullLink, { recursive: true })];
                    case 1:
                        _c.sent();
                        fileName = "".concat(crypto.randomBytes(12).toString('hex'), ".").concat(contract.name.split('.').pop());
                        return [4 /*yield*/, contract.mv(path.join(fullLink, fileName))
                            //TO_DO: add blcontract_id
                        ];
                    case 2:
                        _c.sent();
                        //TO_DO: add blcontract_id
                        return [4 /*yield*/, connection.transaction(function (trx) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            ;
                                            return [4 /*yield*/, trx('contract')
                                                    .insert({
                                                    type: DOC_TYPES.RAW_MATERIALS,
                                                    //blcontract_id: ,
                                                    json: fileName,
                                                    src: fullLink
                                                })
                                                    .returning(['id', 'blcontract_id', 'src', 'json', 'type'])];
                                        case 1:
                                            contract = (_a.sent())[0];
                                            return [4 /*yield*/, trx('contract_party')
                                                    .insert({
                                                    profile_id: profile_id,
                                                    contract_id: contract.id
                                                })
                                                    .returning(['id'])];
                                        case 2:
                                            contract_party1 = (_a.sent())[0];
                                            return [4 /*yield*/, trx('contract_party')
                                                    .insert({
                                                    profile_id: buyer_profile_id,
                                                    contract_id: contract.id
                                                })
                                                    .returning(['id'])];
                                        case 3:
                                            contract_party2 = (_a.sent())[0];
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3:
                        //TO_DO: add blcontract_id
                        _c.sent();
                        return [2 /*return*/, contract];
                }
            });
        });
    },
};
var getAnnexes = {
    route: '/:id/annex',
    methid: METHOD_TYPES.GET,
    auth: true,
    fn: function (_a) {
        var id = _a.params.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var annexes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, connection('annex')
                            .select([
                            'create_date',
                            'blannex_id',
                            'src',
                            'json'
                        ])
                            .where({
                            contract_id: id
                        })];
                    case 1:
                        annexes = _b.sent();
                        return [2 /*return*/, annexes];
                }
            });
        });
    }
};
var getAnnex = {
    route: '/annex/:id',
    method: METHOD_TYPES.GET,
    auth: true,
    fn: function (_a) {
        var id = _a.params.id;
        return __awaiter(void 0, void 0, void 0, function () {
            var annexes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, connection('annex')
                            .select([
                            'create_date',
                            'blannex_id',
                            'src',
                            'json'
                        ])
                            .where({
                            id: id
                        })];
                    case 1:
                        annexes = _b.sent();
                        return [2 /*return*/, annex];
                }
            });
        });
    },
};
var addAnnex = {
    route: '/:id/annex',
    method: METHOD_TYPES.POST,
    auth: true,
    fn: function (_a) {
        var user_id = _a.user.id, id = _a.params.id, annex = _a.files.annex;
        return __awaiter(void 0, void 0, void 0, function () {
            var randomStr, fullLink, fileName, annex;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        randomStr = crypto.randomBytes(4).toString('hex');
                        fullLink = "public/annexes/".concat(Date.now(), "/").concat(user_id, "/").concat(randomStr);
                        return [4 /*yield*/, fs.promises.mkdir(fullLink, { recursive: true })];
                    case 1:
                        _b.sent();
                        fileName = "".concat(crypto.randomBytes(12).toString('hex'), ".").concat(annex.name.split('.').pop());
                        return [4 /*yield*/, contract.mv(path.join(fullLink, fileName))
                            //TO_DO: add blannex_id
                        ];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, connection('annex')
                                .insert({
                                src: fullLink,
                                json: fileName,
                                //blannex_id: ,
                            })
                                .returning(['id', 'create_date', 'blannex_id', 'src', 'json'])];
                    case 3:
                        annex = (_b.sent())[0];
                        return [2 /*return*/, annex];
                }
            });
        });
    },
};
module.exports = {
    routes: {
        getContracts: getContracts,
        addContract: addContract,
        getContract: getContract,
        getSides: getSides,
        getAnnex: getAnnex,
        getAnnexes: getAnnexes
    },
    route: '/contract',
};
//# sourceMappingURL=contract.js.map