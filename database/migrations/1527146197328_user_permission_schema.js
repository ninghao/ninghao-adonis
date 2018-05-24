'use strict'

const Schema = use('Schema')

class UserPermissionSchema extends Schema {
  up () {
    this.create('user_permission', (table) => {
      table.increments()
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
      table.integer('permission_id').unsigned().index()
      table.foreign('permission_id').references('permissions.id').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_permission')
  }
}

module.exports = UserPermissionSchema
