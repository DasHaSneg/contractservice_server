const {txClient, queryClient, MissingWalletError} = require("./blmodule");


async function initTxClient(vuexGetters) {
	return await txClient(vuexGetters['common/wallet/signer'], {
		addr: vuexGetters['common/env/apiTendermint']
	})
}

async function initQueryClient(vuexGetters) {
	return await queryClient({
		addr: vuexGetters['common/env/apiCosmos']
	})
}

async function sendMsgCreateAnnex({ rootGetters }, { value, fee = [], memo = '' }) {
    try {
        const txClient = await initTxClient(rootGetters)
        const msg = await txClient.msgCreateAnnex(value)
        const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
gas: "200000" }, memo})
        return result
    } catch (e) {
        if (e == MissingWalletError) {
            throw new Error('TxClient:MsgCreateAnnex:Init Could not initialize signing client. Wallet is required.')
        }else{
            throw new Error('TxClient:MsgCreateAnnex:Send Could not broadcast Tx: '+ e.message)
        }
    }
}

async function sendMsgCreateContract({ rootGetters }, { value, fee = [], memo = '' }) {
    try {
        const txClient=await initTxClient(rootGetters)
        const msg = await txClient.msgCreateContract(value)
        const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
gas: "200000" }, memo})
        return result
    } catch (e) {
        if (e == MissingWalletError) {
            throw new Error('TxClient:MsgCreateContract:Init Could not initialize signing client. Wallet is required.')
        }else{
            throw new Error('TxClient:MsgCreateContract:Send Could not broadcast Tx: '+ e.message)
        }
    }
}

async function sendMsgCompleteContract({ rootGetters }, { value, fee = [], memo = '' }) {
    try {
        const txClient=await initTxClient(rootGetters)
        const msg = await txClient.msgCompleteContract(value)
        const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
    gas: "200000" }, memo})
        return result
    } catch (e) {
        if (e == MissingWalletError) {
            throw new Error('TxClient:MsgCompleteContract:Init Could not initialize signing client. Wallet is required.')
        }else{
            throw new Error('TxClient:MsgCompleteContract:Send Could not broadcast Tx: '+ e.message)
        }
    }
}

async function sendMsgSignAnnex({ rootGetters }, { value, fee = [], memo = '' }) {
    try {
        const txClient=await initTxClient(rootGetters)
        const msg = await txClient.msgSignAnnex(value)
        const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
gas: "200000" }, memo})
        return result
    } catch (e) {
        if (e == MissingWalletError) {
            throw new Error('TxClient:MsgSignAnnex:Init Could not initialize signing client. Wallet is required.')
        }else{
            throw new Error('TxClient:MsgSignAnnex:Send Could not broadcast Tx: '+ e.message)
        }
    }
}

async function sendMsgSignContract({ rootGetters }, { value, fee = [], memo = '' }) {
    try {
        const txClient=await initTxClient(rootGetters)
        const msg = await txClient.msgSignContract(value)
        const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
gas: "200000" }, memo})
        return result
    } catch (e) {
        if (e == MissingWalletError) {
            throw new Error('TxClient:MsgSignContract:Init Could not initialize signing client. Wallet is required.')
        }else{
            throw new Error('TxClient:MsgSignContract:Send Could not broadcast Tx: '+ e.message)
        }
    }
}

