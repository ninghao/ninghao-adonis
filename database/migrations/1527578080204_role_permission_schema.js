'use strict'

const Schema = use('Schema')

class RolePermissionSchema extends Schema {
  up () {
    this.create('role_permission', (table) => {
      table.increments()
      table.integer('role_id').unsigned().index()
      table.foreign('role_id').references('roles.id').onDelete('CASCADE')
      table.integer('permission_id').unsigned().index()
      table.foreign('permission_id').references('permissions.id').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('role_permission')
  }
}

module.exports = RolePermissionSchema
