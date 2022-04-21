'use strict'

const createError = ({ status = 500, message = 'Something went wrong' }) => {
	const error = new Error(message)
	error.status = status

	return error
}

const isError = error => error instanceof Error

const REQUEST_STATUSES = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	UNPROCESSABLE: 422,
	SERVER_ERROR: 500,
}

module.exports = {
	createError,
	isError,
	...REQUEST_STATUSES,
}