exports.up = async knex => {
    await knex.schema
    .table('contract', t =>  {
      t.string('src').notNull()
    })
    .then(() => console.log('created contract src'))
    .catch(err => {
        console.log(err)
        throw err
    })
};
  
exports.down = async knex => {
    await knex.schema
    .table('contract', t => {
    t.dropColumn('src')
    })
    .then(() => console.log('droped created contract src'))
    .catch(err => {
        console.log(err)
        throw err
    })
}