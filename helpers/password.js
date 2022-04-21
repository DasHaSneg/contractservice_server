const bcrypt = require('bcrypt')

module.exports = {
	hash: password => (password ? bcrypt.hash(password, 10) : null),
	check: (password, hash) => (password && hash ? bcrypt.compare(password, hash) : null),
}