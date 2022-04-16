exports.up = async knex => {
    await knex.schema
    .createTable('template', t => {
        t.increments('id').primary().unsigned()
        t.integer('user_id').references('id').inTable('user').unsigned()
        t.string('type')
        t.string('json')
        t.unique(['id'])
    })
    .then(() => console.log('template created'))
        .catch(err => {
              console.log(err)
              throw err
        })
    };
exports.down = async knex => {
    await knex.schema
    .dropTable('template')
    .then(() => console.log('template deleted'))
          .catch(err => {
              console.log(err)
              throw err
          })
    };
