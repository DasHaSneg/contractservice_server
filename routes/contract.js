const METHOD_TYPES = require("../helpers/method_types");
const DOC_TYPES = require("../helpers/types");
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const getContracts = {
    route: '/',
    methid: METHOD_TYPES.GET,
    auth: true,
    fn: async ({ user: { id } }) => {
        const query = connection('contract_party')
			.select(['contract.id', 'type', 'date_started', 'date_created', 'blcontract_id', 'json', 'src'])
			.join('contract', { 'contract_party.contract_id': 'contract.id' })
			.where({profile_id: id})

        const res = await query;

        return res;
    }
}

const getSides = {
    route: '/:id/sides',
    method: METHOD_TYPES.GET,
    auth: true,
    fn: async ({ params: { id } }) => {
        const sides = await connection('contract_party')
        .select([
            'profile.id', 
            'profile.name', 
            'profile.address', 
            'profile.mailling_address', 
            'profile.inn',
            'profile.cpp',
            'profile.bank',
            'profile.settlement_account',
            'profile.corresponded_account',
            'profile.bic'
        ])
        .join('profile', {'contract_party.profile_id': 'profile.id'})
        .where({
            contract_id: id
        });
		return  sides
    },
}

const getContract = {
	route: '/:id',
	method: METHOD_TYPES.GET,
	auth: true,
	fn: async ({ params: { id } }) => {
		const contracts = await connection('contract')
        .select(['id', 'date_started', 'date_created', 'blcontract_id', 'json', 'src'])
        .whereIn('id', id.split(','));
		return contracts
	},
}

const addContract = {
    route: '/',
	method: METHOD_TYPES.POST,
	auth: true,
    fn: async ({ user: { id: user_id, profile_id }, body: { buyer_profile_id }, files: { contract } }) => {
		
        const randomStr = crypto.randomBytes(4).toString('hex');
        const fullLink = `public/contracts/${Date.now()}/${user_id}/${randomStr}`;

        await fs.promises.mkdir(fullLink, { recursive: true });

        const fileName = `${crypto.randomBytes(12).toString('hex')}.${contract.name.split('.').pop()}`

        await contract.mv(path.join(fullLink, fileName))

        //TO_DO: add blcontract_id

        await connection.transaction(async trx => {
            ;[contract] = await trx('contract')
			.insert({
				type: DOC_TYPES.RAW_MATERIALS,
				blcontract_id: ,
				json: fileName,
                src: fullLink
			})
			.returning(['id', 'blcontract_id', 'src', 'json', 'type'])
            
            
            ;[contract_party1] = await trx ('contract_party')
            .insert({
                profile_id: profile_id,
                contract_id: contract.id
            })
            .returning(['id'])

            ;[contract_party2] = await trx ('contract_party')
            .insert({
                profile_id: buyer_profile_id,
                contract_id: contract.id
            })
            .returning(['id'])

        });

		return contract
	},
}

const getAnnexes = {
    route: '/:id/annex',
    methid: METHOD_TYPES.GET,
    auth: true,
    fn: async ({ params: { id} }) => {
        const annexes = await connection('annex')
        .select([
            'create_date', 
            'blannex_id', 
            'src', 
            'json'
        ])
        .where({
            contract_id: id
        });
        return annexes;
    }
}

const getAnnex = {
	route: '/annex/:id',
	method: METHOD_TYPES.GET,
	auth: true,
	fn: async ({ params: { id } }) => {
		const annexes = await connection('annex')
        .select([
            'create_date', 
            'blannex_id', 
            'src', 
            'json'
        ])
        .where({
            id: id
        });
        return annex;
	},
}

const addAnnex = {
    route: '/:id/annex',
	method: METHOD_TYPES.POST,
	auth: true,
    fn: async ({ user: { id: user_id }, params: { id }, files: { annex } }) => {

        const randomStr = crypto.randomBytes(4).toString('hex');
        const fullLink = `public/annexes/${Date.now()}/${user_id}/${randomStr}`;

        await fs.promises.mkdir(fullLink, { recursive: true });

        const fileName = `${crypto.randomBytes(12).toString('hex')}.${annex.name.split('.').pop()}`

        await contract.mv(path.join(fullLink, fileName))

         //TO_DO: add blannex_id

		const [annex] = await connection('annex')
			.insert({
				src: fullLink,
				json: fileName,
				blannex_id: ,
			})
			.returning(['id', 'create_date', 'blannex_id', 'src','json'])

		return annex
	},
}


module.exports = {
    routes: {
        getContracts,
        addContract,
        getContract,
        getSides,
        getAnnex,
        getAnnexes
    },
    route: '/contract',
}