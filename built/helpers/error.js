'use strict';
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
var createError = function (_a) {
    var _b = _a.status, status = _b === void 0 ? 500 : _b, _c = _a.message, message = _c === void 0 ? 'Something went wrong' : _c;
    var error = new Error(message);
    error.status = status;
    return error;
};
var isError = function (error) { return error instanceof Error; };
var REQUEST_STATUSES = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE: 422,
    SERVER_ERROR: 500,
};
module.exports = __assign({ createError: createError, isError: isError }, REQUEST_STATUSES);
//# sourceMappingURL=error.js.map