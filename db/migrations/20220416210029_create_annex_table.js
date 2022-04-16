exports.up = async knex => {
    await knex.schema
    .createTable('annex', t => {
      t.increments('id').primary().unsigned()
      t.integer('contract_id').references('id').inTable('contract').unsigned()
      t.timestamp('date_created').defaultTo(knex.fn.now())
      t.integer('blannex_id')
      t.string('json')
      t.unique(['id', 'blannex_id'])
    })
    .then(() => console.log('annex created'))
          .catch(err => {
              console.log(err)
              throw err
          })
    };
  
exports.down = async knex => {
    await knex.schema
    .dropTable('annex')
    .then(() => console.log('annex deleted'))
        .catch(err => {
            console.log(err)
            throw err
        })
    };
