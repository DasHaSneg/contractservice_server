"use strict";
var PORT = require('./config').PORT;
var init = require('./db').init;
init()
    .then(function (db) {
    var app = require('./index');
    app.listen(PORT, function () {
        console.log("Server started on port ".concat(PORT));
    }).on('error', function (err) {
        console.error('error starting express: ', err);
    });
})
    .catch(function (err) {
    console.error('error connection to db, server not started: ', err);
});
//# sourceMappingURL=start.js.map