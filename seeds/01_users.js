const {getBlockcnainAddressInfo} = require('../helpers/blockchain');
const {hash} = require('../helpers/password');

const TABLES = ['profile', 'user', 'template', 'contract', 'annex', 'contract_party'];

exports.seed = async function(knex) {
  for (let table of TABLES.reverse()) {
		await knex.raw(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`)
	}

  const {publicAddress: pb1, mnemonic: mn1} = await getBlockcnainAddressInfo();
  const {publicAddress: pb2, mnemonic: mn2} = getBlockcnainAddressInfo();

  await knex('profile').insert([
		{
      inn: "417405238280",
      name: "Компания 1",
      address: "014202, Курганская область, город Сергиев Посад, пл. Балканская, 36",
      mail_address: "014202, Курганская область, город Сергиев Посад, пл. Балканская, 36",
      cpp: "199743738", 
      bank: "Сбербанк",
      settlement_account: "50304330500000005598", 
      correspondent_account: "50804552700000001015", 
      bic: "307017935",
      public_address: pb1
		},
    {
      inn: "869772510972",
      name: "Компания 2",
      address: "599575, Самарская область, город Серпухов, проезд Гоголя, 72",
      mail_address: "599575, Самарская область, город Серпухов, проезд Гоголя, 72",
      cpp: "167245680", 
      bank: "Сбербанк",
      settlement_account: "40484255400000007459", 
      correspondent_account: "50508033600000008304", 
      bic: "407834583",
      public_address: pb2
		}
  ])

  await knex('user').insert([
    {
      email: "company1@mail.ru",
      password: hash('1234'),
      profile_id: 0,
      mnemonic: mn1
    },
    {
      email: "company2@mail.ru",
      password: hash('1234'),
      profile_id: 1,
      mnemonic: mn2
    }
  ])
};
