exports.up = async knex => {
    await knex.schema
    .table('annex', t =>  {
      t.string('src').notNull()
    })
    .then(() => console.log('created annex src'))
    .catch(err => {
        console.log(err)
        throw err
    })
};
  
exports.down = async knex => {
    await knex.schema
    .table('cannex', t => {
    t.dropColumn('src')
    })
    .then(() => console.log('droped created annex src'))
    .catch(err => {
        console.log(err)
        throw err
    })
}