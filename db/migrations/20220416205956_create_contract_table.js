exports.up = async knex => {
    await knex.schema
    .createTable('contract', t => {
      t.increments('id').primary().unsigned()
      t.string('type')
      t.timestamp('date_started').defaultTo(knex.fn.now())
      t.timestamp('date_created').defaultTo(knex.fn.now())
      t.integer('blcontract_id')
      t.string('json')
      t.unique(['id', 'blcontract_id'])
    })
    .then(() => console.log('contract created'))
          .catch(err => {
              console.log(err)
              throw err
          })
    };
  
exports.down = async knex => {
    await knex.schema
    .dropTable('contract')
    .then(() => console.log('contract deleted'))
        .catch(err => {
            console.log(err)
            throw err
        })
    };
