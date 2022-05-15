const createError = require('http-errors');
const { SERVER_ERROR, BAD_REQUEST } = require('../helpers/error');
const METHOD_TYPES = require("../helpers/method_types");
const DOC_TYPES = require("../helpers/types");
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {mesApi} = require('../blockchain/txclient');
const Signer = require('../blockchain/signer');
const Password = require('../helpers/password')
const { connection } = require('../db');


const getContracts = {
    route: '/',
    method: METHOD_TYPES.GET,
    //auth: true,
    fn: async ({ user: { id, profile_id } }) => {
        const query = connection('contract_party')
			.select(['contract.id', 'type', 'date_started', 'date_created', 'blcontract_id', 'file', 'contract_party.role'])
			.join('contract', { 'contract_party.contract_id': 'contract.id' })
			.where({profile_id: id})

        const res = await query;
        console.log(res)

        //parse file to get profiles
        //get contracts by inn (client maybe)
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
        .select(['id', 'date_started', 'date_created', 'blcontract_id', 'file'])
        .whereIn('id', id.split(','));
        //parse file and get profiles
        //get status
        console.log(contracts)
		return contracts
	},
}

const addContract = {
    route: '/',
	method: METHOD_TYPES.POST,
	auth: true,
    fn: async ({ user: {id}, body: { sellerProfile, buyerProfile } }) => {

        if (!sellerProfile || !buyerProfile) {
            return createError({
				status: BAD_REQUEST,
				message: `You did not enter seller profile or buyerProfile!`
			})
        }
        
        let info = {
            seller: sellerProfile,
            buyer: buyerProfile
        };
        
        let jsonObj = JSON.stringify(info);

        const [{mnemonic}] = await connection('user')
            .select([
                'mnemonic'
            ])
            .where({
                id: id
            });

        console.log(mnemonic)

        if (!mnemonic) {
            return createError({
				status: SERVER_ERROR,
				message: `User not found`,
			});
        }
      
        let signer = new Signer(mesApi, mnemonic);
        await signer.init();

        console.log({
            creator: signer.publicAddress,
            contractHash: await Password.hash(jsonObj), 
            buyer: buyerProfile.public_address,
            sellerInn: sellerProfile.inn,
            buyerInn: buyerProfile.inn
        })

        let result = await signer.messageApi.createContract({
            creator: signer.publicAddress,
            contractHash: await Password.hash(jsonObj), 
            buyer: buyerProfile.public_address,
            sellerInn: sellerProfile.inn,
            buyerInn: buyerProfile.inn
        });

        console.log(result);

        if (!(result || result.Id)) {
            return createError({
				status: SERVER_ERROR,
				message: `Blockchain contract id error`,
			});
        } 

        let contract = null;
        let contract_party1 = null;
        let contract_party2 = null;

        await connection.transaction(async trx => {
            ;[contract] = await trx('contract')
			.insert({
				type: DOC_TYPES.RAW_MATERIALS,
				blcontract_id: result.Id,
				file: jsonObj
			})
			.returning(['id', 'blcontract_id', 'type', 'file'])
            
            
            ;[contract_party1] = await trx ('contract_party')
            .insert({
                profile_id: sellerProfile.id,
                contract_id: contract.id,
                role: 'seller'
            })
            .returning(['id'])

            ;[contract_party2] = await trx ('contract_party')
            .insert({
                profile_id: buyerProfile.id,
                contract_id: contract.id,
                role: 'buyer'
            })
            .returning(['id'])

        });

        contract.status = result.State;

		return contract
	},
}

const getAnnexes = {
    route: '/:id/annex',
    method: METHOD_TYPES.GET,
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
	route: '/:contract_id/annex/:id',
	method: METHOD_TYPES.GET,
	auth: true,
	fn: async ({ params: { contract_id, id } }) => {
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
    fn: async ({ user: { id: user_id }, params: { contract_id }, body: { products } }) => {

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
				//blannex_id: ,
			})
			.returning(['id', 'create_date', 'blannex_id', 'src','json'])

		return annex
	},
}

const signContract = {
    route: '/:id/sign',
	method: METHOD_TYPES.POST,
	auth: true,
    fn: async ({ user: { id: user_id }, params: { id } }) => {

        const mnemonic = await connection('user')
        .select([
            'mnemonic'
        ])
        .where({
            id: user_id
        });

        console.log(mnemonic)

        const blcontract_id = await connection('contract')
        .select([
            'blcontract_id'
        ])
        .where({
            id: id
        });

        console.log(blcontract_id)

        if (!mnemonic) {
            return createError({
                status: SERVER_ERROR,
                message: `User not found`,
            });
        }

        let signer = new Signer(mesApi, mnemonic);
        await signer.init();

        let result = await signer.messageApi.signContract({
            creator: signer.publicAddress,
            contractId: blcontract_id
        });

        return result;
    }
}

const signAnnex = {
    route: '/:id/annex/sign',
	method: METHOD_TYPES.POST,
	auth: true,
    fn: async ({ user: { id: user_id }, params: { id } }) => {

        const mnemonic = await connection('user')
        .select([
            'mnemonic'
        ])
        .where({
            id: user_id
        });

        console.log(mnemonic)

        const blannex_id = await connection('annex')
        .select([
            'blannex_id'
        ])
        .where({
            contract_id: id
        });

        console.log(blannex_id)

        if (!mnemonic) {
            return createError({
                status: SERVER_ERROR,
                message: `User not found`,
            });
        }

        let signer = new Signer(mesApi, mnemonic);
        await signer.init();

        let result = await signer.messageApi.signAnnex({
            creator: signer.publicAddress,
            annexId: blannex_id
        });

        return result;
    }
}

const completeContract = {
    route: '/:id/complete',
	method: METHOD_TYPES.POST,
	auth: true,
    fn: async ({ user: { id: user_id }, params: { id } }) => {

        const mnemonic = await connection('user')
        .select([
            'mnemonic'
        ])
        .where({
            id: user_id
        });

        console.log(mnemonic)

        const blcontract_id = await connection('contract')
        .select([
            'blcontract_id'
        ])
        .where({
            contract_id: id
        });

        console.log(blcontract_id)

        if (!mnemonic) {
            return createError({
                status: SERVER_ERROR,
                message: `User not found`,
            });
        }

        let signer = new Signer(mesApi, mnemonic);
        await signer.init();

        let result = await signer.messageApi.completeContract({
            creator: signer.publicAddress,
            contractId: blcontract_id
        });

        return result;
    }
}


module.exports = {
    routes: {
        getContracts,
        addContract,
        getContract,
        getSides,
        getAnnex,
        getAnnexes,
        addAnnex,
        signContract,
        signAnnex,
        completeContract
    },
    route: '/contract',
}