const createError = require('http-errors');
const { BAD_REQUEST } = require('../helpers/error');
const METHOD_TYPES = require('./../helpers/method_types');
const Password = require('../helpers/password')
const { allowedFields, signUser } = require('../helpers/passport');
const { connection } = require('../db');
const passport = require('passport');
const {mesApi} = require('../blockchain/txclient');
const Signer = require('../blockchain/signer');
const {ACCOUNT_MNEMONIC} = require('../config');


const login = {
    route: '/login',
    method: METHOD_TYPES.POST,
    fn: async({body: {email, password}}) => {
        if (!email || !password) {
            return createError({
				status: BAD_REQUEST,
				message: `You didn't enter your email or password!`,
			});
        }
		
        return new Promise(res => {
            passport.authenticate('local', { session: false}, (error, user) => {
                if (error) {
                    res(error);
                }
                if(!user) {
                    return res(
                        createError({
                            status: BAD_REQUEST,
                            message: 'Invalid email address or password!',
                        })
                    )
                }
                console.log(user);
                res(signUser(user));
            })({
				body: {
					email,
					password,
				},
			});
        });
    }
}

const profileRequiredFields = ['inn', 'name', 'address', 'mail_address', 'cpp', 'bank', 'settlement_account', 'correspondent_account', 'bic']

const test = {
    route: '/test/:id',
    method: METHOD_TYPES.GET,
    fn: async ({ params: { id } }) => {
        let mainSigner = new Signer(mesApi, ACCOUNT_MNEMONIC);
        await mainSigner.init();
        let signer = new Signer(mesApi);
        await signer.init();

        let result = await mainSigner.messageApi.send({
                    fromAddress: mainSigner.publicAddress, 
                    toAddress: signer.publicAddress, 
                    amount: [{
                        denom: "stake",
                        amount: "10",
                    }]
        });

        console.log(result);

        result = await signer.messageApi.createContract({
            creator: signer.publicAddress,
            contractHash: 'sdfdff', 
            buyer:'test1'
        });

        console.log(result);
    }
}

const register = {
    route: '/register',
    method: METHOD_TYPES.POST,
    fn: async ({body: {email, password, profile}}) => {
        if (!email) {
            return createError({
                status: BAD_REQUEST,
                message: "You didn't send email!"
            })
        }

        const otherUserEmail = await connection('user').select('id').where({ email }).first()
        if (otherUserEmail) {
            return createError({
				status: CONFLICT,
				message: `An account with this email is already registered`
			})
        }

        if (!profile || profileRequiredFields.some(field => !profile[field])) {
            return createError({
                status: BAD_REQUEST,
                message: 'You did not enter all the fields to create a profile!',
            })
        }

        let signer = new Signer(mesApi);
        await signer.init();
        let publicAddress = signer.publicAddress;

        let profile_id = null;
        let user = null;

        await connection.transaction(async trx => {
            
            ;[profile_id] = await trx('profile')
                .insert({
                    ...profile
                })
                .returning('id');

            ;[user] = await trx('user')
                .insert({
                    email,
                    password: await Password.hash(password),
                    profile_id: profile_id.id,
                    public_address: publicAddress,
                    mnemonic: signer.mnemonic
                })
                .returning(allowedFields)
        });

        return signUser(user);
    }
}

module.exports = {
    routes: {
        register,
        login,
        test,
    },
    route: '/auth',
}