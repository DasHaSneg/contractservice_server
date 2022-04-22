const { PORT } = require('./config')

const { init } = require('./db')

init()
	.then((db:any)  => {
		const app = require('./index')

		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`)
		}).on('error', (err: any) => {
			console.error('error starting express: ', err)
		})
	})
	.catch((err: any) => {
		console.error('error connection to db, server not started: ', err)
	})