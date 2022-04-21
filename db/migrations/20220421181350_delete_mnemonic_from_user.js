exports.up = async knex => {
    await knex.schema
    .table('user', t => {
    t.dropColumn('mnemonic')
    })
    .then(() => console.log('droped user mnemonic'))
    .catch(err => {
        console.log(err)
        throw err
    })
};
  
exports.down = async knex => {
    await knex.schema
    .table('user', t =>  {
      t.integer('mnemonic').notNull()
    })
    .then(() => console.log('created user mnemonic'))
    .catch(err => {
        console.log(err)
        throw err
    })
}