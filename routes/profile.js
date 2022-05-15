const { connection } = require('../db');
const METHOD_TYPES = require("../helpers/method_types");

const getProfile= {
	route: '/:id',
	method: METHOD_TYPES.GET,
	auth: true,
	fn: async ({ params: { id } }) => {
		const profile = await connection('profile')
        .select([
            'id', 
            'inn', 
            'name', 
            'address',
            'mail_address',
            'cpp',
            'bank',
            'settlement_account',
            'correspondent_account', 
            'bic'
        ])
        .where({
            id: id
        });
        return profile;
	},
}

const getProfileByINN= {
	route: '/inn/:inn',
	method: METHOD_TYPES.GET,
	auth: true,
	fn: async ({ params: { inn } }) => {
		const profile = await connection('profile')
        .select([
            'id', 
            'inn', 
            'name', 
            'address',
            'mail_address',
            'cpp',
            'bank',
            'settlement_account',
            'correspondent_account', 
            'bic',
            'public_address'
        ])
        .where({
            inn: inn
        });
        return profile;
	},
}

module.exports = {
    routes: {
        getProfile,
        getProfileByINN
    },
    route: '/profile',
}
