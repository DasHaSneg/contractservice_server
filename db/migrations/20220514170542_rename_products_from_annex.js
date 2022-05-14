exports.up = async knex => {
    await knex.schema
    .table('annex', t => {
        t.dropColumn('products');
        t.jsonb('file').notNull();
    })
    .then(() => console.log('droped created annex src'))
    .catch(err => {
        console.log(err)
        throw err
    })
};
  
exports.down = async knex => {
    await knex.schema
    .table('annex', t =>  {
        t.jsonb('products').notNull();
        t.dropColumn('file');
    })
    .then(() => console.log('created annex src'))
    .catch(err => {
        console.log(err)
        throw err
    })
}