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
        
        //get user mnemonic
        const [{mnemonic}] = await connection('user')
            .select([
                'mnemonic'
            ])
            .where({
                id: id
            });

        if (!mnemonic) {
            return createError({
				status: SERVER_ERROR,
				message: `User not found`,
			});
        }
      
        let signer = new Signer(mesApi, mnemonic);
        await signer.init();

        let info = {
            seller: sellerProfile,
            buyer: buyerProfile
        };
        
        //make contract file
        let jsonObj = JSON.stringify(info);

        //send message createContract to blockchain
        let result = await signer.messageApi.createContract({
            creator: signer.publicAddress,
            contractHash: await Password.hash(jsonObj), 
            buyer: buyerProfile.public_address,
            sellerInn: sellerProfile.inn,
            buyerInn: buyerProfile.inn
        });


        if (!(result || result.Id)) {
            return createError({
				status: SERVER_ERROR,
				message: `Blockchain contract id error`,
			});
        } 

        let contract = null;
        let contract_party1 = null;
        let contract_party2 = null;

        //add contract to bd
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
    fn: async ({ user: { id }, params: { contract_id }, body: { products, buyerProfile } }) => {

        const [{blcontract_id}] = await connection('contract')
        .select([
            'blcontract_id'
        ])
        .where({
            id: contract_id
        });

        console.log(blcontract_id)
        
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

        //make annex file
        let jsonObj = JSON.stringify(products);

        //send message createContract to blockchain
        let result = await signer.messageApi.createAnnex({
            creator: signer.publicAddress,
            annexHash: await Password.hash(jsonObj), 
            contract_id: blcontract_id,
            buyer: buyerProfile.public_address,
        });


        if (!(result || result.Id || result.ContractState || result.AnnexState)) {
            return createError({
				status: SERVER_ERROR,
				message: `Blockchain annex id error`,
			});
        } 

		const [annex] = await connection('annex')
			.insert({
				file: jsonObj,
				blannex_id: result.Id
			})
			.returning(['id', 'create_date', 'blannex_id', 'file'])

        annex.status = result.AnnexState;
        annex.contractState = result.ContractState;
		return annex
	},
}

const signContract = {
    route: '/:id/sign',
	method: METHOD_TYPES.POST,
	auth: true,
    fn: async ({ user: { id: user_id }, params: { id } }) => {

        const [{mnemonic}] = await connection('user')
        .select([
            'mnemonic'
        ])
        .where({
            id: user_id
        });

        if (!mnemonic) {
            return createError({
                status: SERVER_ERROR,
                message: `User not found`,
            });
        }

        const [{blcontract_id}] = await connection('contract')
        .select([
            'blcontract_id'
        ])
        .where({
            id: id
        });

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

        const [{mnemonic}] = await connection('user')
        .select([
            'mnemonic'
        ])
        .where({
            id: user_id
        });

        console.log(mnemonic)

        if (!mnemonic) {
            return createError({
                status: SERVER_ERROR,
                message: `User not found`,
            });
        }

        const [{blannex_id}] = await connection('annex')
        .select([
            'blannex_id'
        ])
        .where({
            contract_id: id
        });

        console.log(blannex_id)

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

        const [{mnemonic}] = await connection('user')
        .select([
            'mnemonic'
        ])
        .where({
            id: user_id
        });

        if (!mnemonic) {
            return createError({
                status: SERVER_ERROR,
                message: `User not found`,
            });
        }

        const [{blcontract_id}] = await connection('contract')
        .select([
            'blcontract_id'
        ])
        .where({
            contract_id: id
        });

        console.log(blcontract_id)

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