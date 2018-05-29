'use strict'

const Schema = use('Schema')

class UserRoleSchema extends Schema {
  up () {
    this.create('user_role', (table) => {
      table.increments()
      table.integer('role_id').unsigned().index()
      table.foreign('role_id').references('roles.id').onDelete('CASCADE')
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_role')
  }
}

module.exports = UserRoleSchema
