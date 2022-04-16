const { Pool } = require('pg')
const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = require('../config')

const createDb = () =>
	new Promise((res, rej) => {
		const pool = new Pool({
			user: DB_USERNAME,
			password: DB_PASSWORD,
			database: 'postgres',
			host: DB_HOST,
			port: DB_PORT,
		})

		pool.connect()
			.then(client => {
				return client
					.query('CREATE DATABASE ' + DB_NAME) // your query string here
					.then(res => {
						console.log('Success!')
					})
					.catch(err => {
						rej(err)
					})
			})
			.catch(err => {
				rej(err)
			})
	})

    const run = async () => {
        try {
            await createDb()
        } catch (e) {
            console.error('Error creating DB: ', e)
            process.exit(1)
        }
    
        process.exit(0)
    }
    
    run()