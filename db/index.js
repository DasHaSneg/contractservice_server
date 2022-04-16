const config = require('../knexfile')
const knex = require('knex')

async function init() {
	return (module.exports.connection = await knex(config.development))
}

/**
 * @typedef {Object} db
 * @property {function} init
 * @property {knex()} connection
 */

/**
 * @type db
 * @exports db
 */
module.exports = {
	init,
	connection: null,
}
