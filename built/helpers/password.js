"use strict";
var bcrypt = require('bcrypt');
module.exports = {
    hash: function (password) { return (password ? bcrypt.hash(password, 10) : null); },
    check: function (password, hash) { return (password && hash ? bcrypt.compare(password, hash) : null); },
};
//# sourceMappingURL=password.js.map