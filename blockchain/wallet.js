const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');
const {assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient} = require('@cosmjs/stargate');
const {BLOCKCHAIN_RPC} = require('../config');

const ErrorCreateWallet = () => createError('Wallet error');

const createWallet = async () => {
    try {
        return await DirectSecp256k1HdWallet.generate(18);
    } catch(err) {
        throw ErrorCreateWallet; 
    }
};

const getAddress = async (wallet) => {
    return await wallet.getAccounts()[0].address;
}

const getWalletByMnemonic = async () => await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);

const getAccount = async (wallet) => await wallet.getAccounts()[0];

const getClient = async (wallet) => (await SigningStargateClient.connectWithSigner(BLOCKCHAIN_RPC, wallet));

const signAndBroadcast = async (client, recipientAddress, msgObj, fee, memo = "") => {
    try {
        const result = await client.signAndBroadcast(
            recipientAddress,
            [msgObj],
            fee,
            memo
          );
        
        console.log(result);
        assertIsBroadcastTxSuccess(result);
    } catch(err) {
        console.log(err);
    }
}

class Wallet {
    constructor(mnemonic="") {
        this.mnemonic = mnemonic;
    }

    init = async () => {
        if (this.mnemonic) {
            this.wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic); 
        } else {
            this.wallet = await DirectSecp256k1HdWallet.generate(18);;
        }

        this.mnemonic = this._getMnemonic();
        this.account = await this._getAccount();
    };

    _getAccount = async () => {
        return (await this.wallet.getAccounts())[0];
    }

    _getMnemonic = () => {
        return this.wallet.secret.data;
    }

    getAddress = () => {
        return this.account.address;
    }
}


module.exports = Wallet;

