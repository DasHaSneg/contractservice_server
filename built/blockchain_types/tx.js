/* eslint-disable */
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
export var protobufPackage = 'cosmonaut.documentservice.documentservice';
function createBaseMsgCreateContract() {
    return { creator: '', contractHash: '', buyer: '' };
}
export var MsgCreateContract = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.contractHash !== '') {
            writer.uint32(18).string(message.contractHash);
        }
        if (message.buyer !== '') {
            writer.uint32(26).string(message.buyer);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgCreateContract();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.contractHash = reader.string();
                    break;
                case 3:
                    message.buyer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            creator: isSet(object.creator) ? String(object.creator) : '',
            contractHash: isSet(object.contractHash) ? String(object.contractHash) : '',
            buyer: isSet(object.buyer) ? String(object.buyer) : '',
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.contractHash !== undefined && (obj.contractHash = message.contractHash);
        message.buyer !== undefined && (obj.buyer = message.buyer);
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c;
        var message = createBaseMsgCreateContract();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : '';
        message.contractHash = (_b = object.contractHash) !== null && _b !== void 0 ? _b : '';
        message.buyer = (_c = object.buyer) !== null && _c !== void 0 ? _c : '';
        return message;
    },
};
function createBaseMsgCreateContractResponse() {
    return { id: Long.UZERO, createDate: '' };
}
export var MsgCreateContractResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.createDate !== '') {
            writer.uint32(18).string(message.createDate);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgCreateContractResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                case 2:
                    message.createDate = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
            createDate: isSet(object.createDate) ? String(object.createDate) : '',
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
        message.createDate !== undefined && (obj.createDate = message.createDate);
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseMsgCreateContractResponse();
        message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
        message.createDate = (_a = object.createDate) !== null && _a !== void 0 ? _a : '';
        return message;
    },
};
function createBaseMsgCreateAnnex() {
    return { creator: '', annexHash: '', contractId: Long.UZERO, buyer: '' };
}
export var MsgCreateAnnex = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.annexHash !== '') {
            writer.uint32(18).string(message.annexHash);
        }
        if (!message.contractId.isZero()) {
            writer.uint32(24).uint64(message.contractId);
        }
        if (message.buyer !== '') {
            writer.uint32(34).string(message.buyer);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgCreateAnnex();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.annexHash = reader.string();
                    break;
                case 3:
                    message.contractId = reader.uint64();
                    break;
                case 4:
                    message.buyer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            creator: isSet(object.creator) ? String(object.creator) : '',
            annexHash: isSet(object.annexHash) ? String(object.annexHash) : '',
            contractId: isSet(object.contractId) ? Long.fromString(object.contractId) : Long.UZERO,
            buyer: isSet(object.buyer) ? String(object.buyer) : '',
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.annexHash !== undefined && (obj.annexHash = message.annexHash);
        message.contractId !== undefined && (obj.contractId = (message.contractId || Long.UZERO).toString());
        message.buyer !== undefined && (obj.buyer = message.buyer);
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c;
        var message = createBaseMsgCreateAnnex();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : '';
        message.annexHash = (_b = object.annexHash) !== null && _b !== void 0 ? _b : '';
        message.contractId = object.contractId !== undefined && object.contractId !== null ? Long.fromValue(object.contractId) : Long.UZERO;
        message.buyer = (_c = object.buyer) !== null && _c !== void 0 ? _c : '';
        return message;
    },
};
function createBaseMsgCreateAnnexResponse() {
    return { id: Long.UZERO, createDate: '' };
}
export var MsgCreateAnnexResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.createDate !== '') {
            writer.uint32(18).string(message.createDate);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgCreateAnnexResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                case 2:
                    message.createDate = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
            createDate: isSet(object.createDate) ? String(object.createDate) : '',
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
        message.createDate !== undefined && (obj.createDate = message.createDate);
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseMsgCreateAnnexResponse();
        message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
        message.createDate = (_a = object.createDate) !== null && _a !== void 0 ? _a : '';
        return message;
    },
};
function createBaseMsgSignAnnex() {
    return { creator: '', annexId: Long.UZERO };
}
export var MsgSignAnnex = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (!message.annexId.isZero()) {
            writer.uint32(16).uint64(message.annexId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgSignAnnex();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.annexId = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            creator: isSet(object.creator) ? String(object.creator) : '',
            annexId: isSet(object.annexId) ? Long.fromString(object.annexId) : Long.UZERO,
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.annexId !== undefined && (obj.annexId = (message.annexId || Long.UZERO).toString());
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseMsgSignAnnex();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : '';
        message.annexId = object.annexId !== undefined && object.annexId !== null ? Long.fromValue(object.annexId) : Long.UZERO;
        return message;
    },
};
function createBaseMsgSignAnnexResponse() {
    return {};
}
export var MsgSignAnnexResponse = {
    encode: function (_, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgSignAnnexResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (_) {
        return {};
    },
    toJSON: function (_) {
        var obj = {};
        return obj;
    },
    fromPartial: function (_) {
        var message = createBaseMsgSignAnnexResponse();
        return message;
    },
};
function createBaseMsgSignContract() {
    return { creator: '', contractId: Long.UZERO };
}
export var MsgSignContract = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (!message.contractId.isZero()) {
            writer.uint32(16).uint64(message.contractId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgSignContract();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.contractId = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            creator: isSet(object.creator) ? String(object.creator) : '',
            contractId: isSet(object.contractId) ? Long.fromString(object.contractId) : Long.UZERO,
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.contractId !== undefined && (obj.contractId = (message.contractId || Long.UZERO).toString());
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseMsgSignContract();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : '';
        message.contractId = object.contractId !== undefined && object.contractId !== null ? Long.fromValue(object.contractId) : Long.UZERO;
        return message;
    },
};
function createBaseMsgSignContractResponse() {
    return {};
}
export var MsgSignContractResponse = {
    encode: function (_, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgSignContractResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (_) {
        return {};
    },
    toJSON: function (_) {
        var obj = {};
        return obj;
    },
    fromPartial: function (_) {
        var message = createBaseMsgSignContractResponse();
        return message;
    },
};
function createBaseMsgCompleteContract() {
    return { creator: '', contractId: Long.UZERO };
}
export var MsgCompleteContract = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (!message.contractId.isZero()) {
            writer.uint32(16).uint64(message.contractId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgCompleteContract();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.contractId = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            creator: isSet(object.creator) ? String(object.creator) : '',
            contractId: isSet(object.contractId) ? Long.fromString(object.contractId) : Long.UZERO,
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.contractId !== undefined && (obj.contractId = (message.contractId || Long.UZERO).toString());
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseMsgCompleteContract();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : '';
        message.contractId = object.contractId !== undefined && object.contractId !== null ? Long.fromValue(object.contractId) : Long.UZERO;
        return message;
    },
};
function createBaseMsgCompleteContractResponse() {
    return {};
}
export var MsgCompleteContractResponse = {
    encode: function (_, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseMsgCompleteContractResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (_) {
        return {};
    },
    toJSON: function (_) {
        var obj = {};
        return obj;
    },
    fromPartial: function (_) {
        var message = createBaseMsgCompleteContractResponse();
        return message;
    },
};
var MsgClientImpl = /** @class */ (function () {
    function MsgClientImpl(rpc) {
        this.rpc = rpc;
        this.CreateContract = this.CreateContract.bind(this);
        this.CreateAnnex = this.CreateAnnex.bind(this);
        this.SignAnnex = this.SignAnnex.bind(this);
        this.SignContract = this.SignContract.bind(this);
        this.CompleteContract = this.CompleteContract.bind(this);
    }
    MsgClientImpl.prototype.CreateContract = function (request) {
        var data = MsgCreateContract.encode(request).finish();
        var promise = this.rpc.request('cosmonaut.documentservice.documentservice.Msg', 'CreateContract', data);
        return promise.then(function (data) { return MsgCreateContractResponse.decode(new _m0.Reader(data)); });
    };
    MsgClientImpl.prototype.CreateAnnex = function (request) {
        var data = MsgCreateAnnex.encode(request).finish();
        var promise = this.rpc.request('cosmonaut.documentservice.documentservice.Msg', 'CreateAnnex', data);
        return promise.then(function (data) { return MsgCreateAnnexResponse.decode(new _m0.Reader(data)); });
    };
    MsgClientImpl.prototype.SignAnnex = function (request) {
        var data = MsgSignAnnex.encode(request).finish();
        var promise = this.rpc.request('cosmonaut.documentservice.documentservice.Msg', 'SignAnnex', data);
        return promise.then(function (data) { return MsgSignAnnexResponse.decode(new _m0.Reader(data)); });
    };
    MsgClientImpl.prototype.SignContract = function (request) {
        var data = MsgSignContract.encode(request).finish();
        var promise = this.rpc.request('cosmonaut.documentservice.documentservice.Msg', 'SignContract', data);
        return promise.then(function (data) { return MsgSignContractResponse.decode(new _m0.Reader(data)); });
    };
    MsgClientImpl.prototype.CompleteContract = function (request) {
        var data = MsgCompleteContract.encode(request).finish();
        var promise = this.rpc.request('cosmonaut.documentservice.documentservice.Msg', 'CompleteContract', data);
        return promise.then(function (data) { return MsgCompleteContractResponse.decode(new _m0.Reader(data)); });
    };
    return MsgClientImpl;
}());
export { MsgClientImpl };
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=tx.js.map