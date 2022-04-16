exports.up = async knex => {
    await knex.schema
    .createTable('user', t => {
      t.increments('id').primary().unsigned()
      t.string('email').unique().index()
      t.string('password')
      t.timestamp('date_created').defaultTo(knex.fn.now())
      t.timestamp('date_updated').defaultTo(knex.fn.now())
      t.integer('profile_id').references('id').inTable('profile').unsigned()
      t.string('public_address').unique().index()
      t.unique(['id'])
    })
    .then(() => console.log('user created'))
          .catch(err => {
              console.log(err)
              throw err
          })
    };
  
exports.down = async knex => {
    await knex.schema
    .dropTable('user')
    .then(() => console.log('user deleted'))
        .catch(err => {
            console.log(err)
            throw err
        })
    };