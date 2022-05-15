exports.up = async knex => {
    await knex.schema
    .table('contract_party', t =>  {
        t.string('role')
    })
    .then(() => console.log('created contract src'))
    .catch(err => {
        console.log(err)
        throw err
    })
};
  
exports.down = async knex => {
    await knex.schema
    .table('contract_party', t => {
        t.dropColumn('role')
    })
    .then(() => console.log('droped created contract src'))
    .catch(err => {
        console.log(err)
        throw err
    })
}
