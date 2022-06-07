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
        t.string('public_address').unique().index()
        t.unique(['id'])
    })
    .createTable('user', t => {
        t.increments('id').primary().unsigned()
        t.string('email').unique().index()
        t.string('password')
        t.timestamp('date_created').defaultTo(knex.fn.now())
        t.timestamp('date_updated').defaultTo(knex.fn.now())
        t.integer('profile_id').references('id').inTable('profile').unsigned()
        t.string('mnemonic').notNull()
        t.unique(['id'])
    })
    .createTable('template', t => {
        t.increments('id').primary().unsigned()
        t.integer('user_id').references('id').inTable('user').unsigned()
        t.string('type')
        t.string('json')
        t.unique(['id'])
    })
    .createTable('contract', t => {
        t.increments('id').primary().unsigned()
        t.string('type')
        t.timestamp('date_started').defaultTo(knex.fn.now())
        t.timestamp('date_created').defaultTo(knex.fn.now())
        t.integer('blcontract_id')
        t.jsonb('file').notNull();
        t.unique(['id', 'blcontract_id'])
      })
    .createTable('annex', t => {
        t.increments('id').primary().unsigned()
        t.integer('contract_id').references('id').inTable('contract').unsigned()
        t.timestamp('date_created').defaultTo(knex.fn.now())
        t.integer('blannex_id')
        t.jsonb('file').notNull();
        t.unique(['id', 'blannex_id'])
    })
    .createTable('contract_party', t => {
        t.increments('id').primary().unsigned()
        t.integer('profile_id').references('id').inTable('profile').unsigned()
        t.integer('contract_id').references('id').inTable('contract').unsigned()
        t.string('role')
        t.unique(['id'])
    })
    .then(() => console.log('tables created'))
        .catch(err => {
              console.log(err)
              throw err
        })
    };


exports.down = async knex => {
    await knex.schema
    .dropTable('profile')
    .dropTable('user')
    .dropTable('template')
    .dropTable('contract')
    .dropTable('annex')
    .dropTable('contract_party')
    .then(() => console.log('tables deleted'))
          .catch(err => {
              console.log(err)
              throw err
          })
};