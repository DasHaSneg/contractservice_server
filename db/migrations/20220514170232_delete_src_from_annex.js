exports.up = async knex => {
    await knex.schema
    .table('contract', t => {
        t.dropColumn('json')
        t.dropColumn('src')
        t.jsonb('products').notNull();
    })
    .then(() => console.log('droped created annex src'))
    .catch(err => {
        console.log(err)
        throw err
    })
};
  
exports.down = async knex => {
    await knex.schema
    .table('contract', t =>  {
        t.string('json')
        t.string('src').notNull()
        t.dropColumn('products')
    })
    .then(() => console.log('created annex src'))
    .catch(err => {
        console.log(err)
        throw err
    })
}