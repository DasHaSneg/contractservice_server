const defaults = {
    PORT: 5000,
    DB_HOST: 'localhost',
    DB_PORT: '5432',
    DB_NAME: 'document_service',
    DB_USERNAME: 'db_admin',
    DB_PASSWORD: '123456',
    TOKEN_SECRET: 'dev_test',
	TOKEN_LIFESPAN: 1000 * 60 * 60 * 24 * 20,
    BLOCKCHAIN_GRPC: "http://localhost:26657",
    ACCOUNT_MNEMONIC: "piece elbow winner sail replace embark rib collect priority coin type mansion roast ship census movie crucial hockey useless seminar visit expect mimic derive"
}

const dotenv = require('dotenv') // config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config()

for (let key in defaults) {
	if (process.env.hasOwnProperty(key)) defaults[key] = process.env[key]
}

module.exports = defaults
