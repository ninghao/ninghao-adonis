'use strict'

const Schema = use('Schema')

class UsersAddIsVerifiedColumnSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.boolean('is_verified').notNull().defaultTo(false)
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('is_verified')
    })
  }
}

module.exports = UsersAddIsVerifiedColumnSchema
