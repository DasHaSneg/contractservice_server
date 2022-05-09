'use strict';
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.disable('x-powered-by');
app.use('/', require('./routes'));
app.use('/api', require('./routes'));
app.use('/api/public', express.static('public'));
module.exports = app;
//# sourceMappingURL=index.js.map