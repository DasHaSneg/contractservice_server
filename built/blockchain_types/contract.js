/* eslint-disable */
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
export var protobufPackage = 'cosmonaut.documentservice.documentservice';
function createBaseContract() {
    return { creator: '', id: Long.UZERO, contractHash: '', state: '', seller: '', buyer: '', createDate: '' };
}
export var Contract = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (!message.id.isZero()) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.contractHash !== '') {
            writer.uint32(26).string(message.contractHash);
        }
        if (message.state !== '') {
            writer.uint32(34).string(message.state);
        }
        if (message.seller !== '') {
            writer.uint32(42).string(message.seller);
        }
        if (message.buyer !== '') {
            writer.uint32(50).string(message.buyer);
        }
        if (message.createDate !== '') {
            writer.uint32(58).string(message.createDate);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseContract();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.id = reader.uint64();
                    break;
                case 3:
                    message.contractHash = reader.string();
                    break;
                case 4:
                    message.state = reader.string();
                    break;
                case 5:
                    message.seller = reader.string();
                    break;
                case 6:
                    message.buyer = reader.string();
                    break;
                case 7:
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
            creator: isSet(object.creator) ? String(object.creator) : '',
            id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
            contractHash: isSet(object.contractHash) ? String(object.contractHash) : '',
            state: isSet(object.state) ? String(object.state) : '',
            seller: isSet(object.seller) ? String(object.seller) : '',
            buyer: isSet(object.buyer) ? String(object.buyer) : '',
            createDate: isSet(object.createDate) ? String(object.createDate) : '',
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
        message.contractHash !== undefined && (obj.contractHash = message.contractHash);
        message.state !== undefined && (obj.state = message.state);
        message.seller !== undefined && (obj.seller = message.seller);
        message.buyer !== undefined && (obj.buyer = message.buyer);
        message.createDate !== undefined && (obj.createDate = message.createDate);
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d, _e, _f;
        var message = createBaseContract();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : '';
        message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
        message.contractHash = (_b = object.contractHash) !== null && _b !== void 0 ? _b : '';
        message.state = (_c = object.state) !== null && _c !== void 0 ? _c : '';
        message.seller = (_d = object.seller) !== null && _d !== void 0 ? _d : '';
        message.buyer = (_e = object.buyer) !== null && _e !== void 0 ? _e : '';
        message.createDate = (_f = object.createDate) !== null && _f !== void 0 ? _f : '';
        return message;
    },
};
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=contract.js.map