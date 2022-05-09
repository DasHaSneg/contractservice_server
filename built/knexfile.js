"use strict";
var _a = require('./config'), DB_HOST = _a.DB_HOST, DB_NAME = _a.DB_NAME, DB_USERNAME = _a.DB_USERNAME, DB_PASSWORD = _a.DB_PASSWORD;
module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: DB_HOST,
            user: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_NAME,
            charset: 'utf8',
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: "".concat(__dirname, "/db/migrations"),
        }
        // seeds: {
        // 	directory: `${__dirname}/db/seeds`,
        // },
    },
};
//# sourceMappingURL=knexfile.js.map