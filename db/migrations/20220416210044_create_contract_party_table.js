exports.up = async knex => {
    await knex.schema
    .createTable('contract_party', t => {
      t.increments('id').primary().unsigned()
      t.integer('profile_id').references('id').inTable('profile').unsigned()
      t.integer('contract_id').references('id').inTable('contract').unsigned()
      t.unique(['id'])
    })
    .then(() => console.log('contract_party created'))
          .catch(err => {
              console.log(err)
              throw err
          })
    };
  
exports.down = async knex => {
    await knex.schema
    .dropTable('contract_party')
    .then(() => console.log('contract_party deleted'))
        .catch(err => {
            console.log(err)
            throw err
        })
    };

