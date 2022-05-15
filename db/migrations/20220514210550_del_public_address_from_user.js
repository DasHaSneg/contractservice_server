exports.up = async knex => {
    await knex.schema
    .table('user', t => {
        t.dropColumn('public_address')
    })
    .then(() => console.log('droped created contract src'))
    .catch(err => {
        console.log(err)
        throw err
    })
};
  
exports.down = async knex => {
    await knex.schema
    .table('user', t =>  {
        t.string('public_address').unique().index()
    })
    .then(() => console.log('created contract src'))
    .catch(err => {
        console.log(err)
        throw err
    })
}