const defaults = {
    PORT: 3000,
    DB_HOST: 'localhost',
    DB_PORT: '5432',
    DB_NAME: 'contract_service',
    DB_USERNAME: 'db_admin',
    DB_PASSWORD: '123456',
    TOKEN_SECRET: 'dev_test',
	TOKEN_LIFESPAN: 1000 * 60 * 60 * 24 * 20,
    BLOCKCHAIN_RPC: "http://localhost:26657",
}

const dotenv = require('dotenv') // config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config()

for (let key in defaults) {
	if (process.env.hasOwnProperty(key)) defaults[key] = process.env[key]
}

module.exports = defaults
