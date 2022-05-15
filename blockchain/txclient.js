const { SigningStargateClient } = require('@cosmjs/stargate');
const { createError } = require("../helpers/error");
const { Registry } = require('@cosmjs/proto-signing');
const {MsgCreateAnnex, MsgCreateContract, MsgCompleteContract, MsgSignAnnex, MsgSignContract} = require('../blockchain_types/tx')
const { MsgSend } = require("cosmjs-types/cosmos/bank/v1beta1/tx");
const { BLOCKCHAIN_GRPC } = require('../config');

// const Api = require('./api');

const mesApi = {
  createContract: {
    message: 'msgCreateContract',
    req: ['creator', 'contractHash', 'buyer', 'sellerInn', 'buyerInn'],
    // res: ['id', 'createDate']
    res: ['Id', 'State']
  },
  createAnnex: {
    message: 'msgCreateAnnex',
    req: ['creator', 'annexHash', 'contractId', 'buyer'],
    res: ['Id', 'ContractState', 'AnnexState']
  },
  completeContract: {
    message: 'msgCompleteContract',
    req: ['creator', 'contractId'],
    res: []
  },
  signAnnex: {
    message: 'msgSignAnnex',
    req: ['creator', 'annexId'],
    res: []
  },
  signContract: {
    message: 'msgSignContract',
    req: ['creator', 'contractId'],
    res: []
  },
  send: {
    message: 'msgSend',
    req: ['fromAddress', 'toAddress', 'amount'],
    res: []
  }
}

const MissingWalletError = () => createError('Wallet is required!');

const types = [
    ["/cosmonaut.documentservice.documentservice.MsgCreateAnnex", MsgCreateAnnex],
    ["/cosmonaut.documentservice.documentservice.MsgCreateContract", MsgCreateContract],
    ["/cosmonaut.documentservice.documentservice.MsgCompleteContract", MsgCompleteContract],
    ["/cosmonaut.documentservice.documentservice.MsgSignAnnex", MsgSignAnnex],
    ["/cosmonaut.documentservice.documentservice.MsgSignContract", MsgSignContract],
    ["/cosmos.bank.v1beta1.MsgSend", MsgSend]
];

const registry = new Registry(types);

const defaultFee = {
    amount: [],
    gas: "200000",
};

const txClient = async (wallet, { addr: addr } = { addr: BLOCKCHAIN_GRPC }) => {
  if (!wallet) throw MissingWalletError;
  let client;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs, { fee, memo } = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgCreateAnnex: (data) => ({ typeUrl: "/cosmonaut.documentservice.documentservice.MsgCreateAnnex", value: MsgCreateAnnex.fromPartial( data ) }),
    msgCreateContract: (data) => ({ typeUrl: "/cosmonaut.documentservice.documentservice.MsgCreateContract", value: MsgCreateContract.fromPartial( data ) }),
    msgCompleteContract: (data) => ({ typeUrl: "/cosmonaut.documentservice.documentservice.MsgCompleteContract", value: MsgCompleteContract.fromPartial( data ) }),
    msgSignAnnex: (data) => ({ typeUrl: "/cosmonaut.documentservice.documentservice.MsgSignAnnex", value: MsgSignAnnex.fromPartial( data ) }),
    msgSignContract: (data) => ({ typeUrl: "/cosmonaut.documentservice.documentservice.MsgSignContract", value: MsgSignContract.fromPartial( data ) }),
    msgSend: (data) => ({typeUrl: "/cosmos.bank.v1beta1.MsgSend", value: MsgSend.fromPartial(data)})
  };
};

// const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
//     return new Api({ baseUrl: addr });
// };

module.exports = {
  mesApi,
  txClient,
  // queryClient,
  MissingWalletError
};