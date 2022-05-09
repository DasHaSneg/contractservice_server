'use strict';
var env = process.env.NODE_ENV || 'development';
var knexfile = require('../knexfile');
var knex = require('knex')(knexfile[env]);
module.exports = knex;
//# sourceMappingURL=database.js.map