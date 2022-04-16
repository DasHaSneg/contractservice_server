exports.up = async knex => {
    await knex.schema
    .createTable('profile', t => {
        t.increments('id').primary().unsigned()
        t.string('inn').unique().index()
        t.string('name')
        t.string('address')
        t.string('mail_address')
        t.string('cpp')
        t.string('bank')
        t.string('settlement_account')
        t.string('correspondent_account')
        t.string('bic')
        t.unique(['id'])
    })
    .then(() => console.log('profile created'))
        .catch(err => {
              console.log(err)
              throw err
        })
    };
exports.down = async knex => {
    await knex.schema
    .dropTable('profile')
    .then(() => console.log('profile deleted'))
          .catch(err => {
              console.log(err)
              throw err
          })
    };