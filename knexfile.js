const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = require('./config')

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
			directory: `${__dirname}/db/migrations`,
		}
		// seeds: {
		// 	directory: `${__dirname}/db/seeds`,
		// },
	},
}