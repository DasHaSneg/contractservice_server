const createError = require('http-errors');
const { BAD_REQUEST } = require('../helpers/error');
const METHOD_TYPES = require('./../helpers/method_types');
const Password = require('../helpers/password')
const { allowedFields, signUser } = require('../helpers/passport');
const { connection } = require('../db');
const passport = require('passport');
const Wallet = require('./../blockchain/wallet');


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
        let wallet = new Wallet();
        await wallet.init()
        console.log(wallet.getAddress());
        console.log(wallet.mnemonic);
    }
}

const register = {
    route: '/register',
    method: METHOD_TYPES.POST,
    fn: async ({body: {email, password, profile: profileInfo}}) => {
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

        if (!profile || profileRequiredFields.some(field => !profileInfo[field])) {
            return createError({
                status: BAD_REQUEST,
                message: 'You did not enter all the fields to create a profile!',
            })
        }

        let wallet = new Wallet();
        await wallet.init()
        publicAddress = wallet.getAddress();

        let profile_id = null;
        let user = null;

        await connection.transaction(async trx => {
            
            ;[profile_id] = await trx('profile')
                .insert({
                    ...profileInfo
                })
                .returning('id');

            ;[user] = await trx('user')
                .insert({
                    email,
                    password: await Password.hash(password),
                    profile_id,
                    public_address: wallet.getAddress(),
                    mnemonic: wallet.mnemonic
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