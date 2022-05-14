const {txClient} = require('./txclient');
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');

class Signer {
    wallet = null;
    client = null;
    account = null;

    constructor(mesApi, mnemonic = "") {
        this.mnemonic = mnemonic;
        this.messageApi = this._createApi(mesApi);
    }

    async init() {
        this.wallet = await createWallet(this.mnemonic);
        this.mnemonic = this.wallet.secret.data;
        this.client = await createClient(this.wallet);
        this.account = (await this.wallet.getAccounts())[0];
    }

    get publicAddress() {
        return this.account.address;
    }

    _createApi(spec) {
        let api = {};
        Object.keys(spec).forEach((key) => {
            api[key] = async (data) => {
                let params = {};
                spec[key].req.forEach(param => {
                    params[param] = data[param];
                });

                let message = this.client[spec[key].message](params);
                let result = await this._send(message);
                console.log(result);
                return this._parseMesEvents(result.rawLog, spec[key].res)
            }
        })
        return api;
    }

    _send = async (message) => await this.client.signAndBroadcast([message]); 
    
    _parseMesEvents(jsonStr, keys) {
        if (keys.length > 0) {
            let result = {};
            let events = JSON.parse(jsonStr)[0].events;
            let event = events.filter(val => val.type === "message")[0];
            keys.forEach(param => result[param] = event.attributes.filter(val => val.key === param)[0].value);
            return result;
        }
        return {};
    }
}

async function createWallet(mnemonic) {
    let wallet = null;
    if (mnemonic) {
        wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic); 
    } else {
        wallet = await DirectSecp256k1HdWallet.generate(18);;
    }
    return wallet;
}

async function createClient(wallet) {
    return await txClient(wallet);
}

module.exports = Signer;

