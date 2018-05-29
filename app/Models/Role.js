'use strict'

const Model = use('Model')

class Role extends Model {
  permissions () {
    return this
      .belongsToMany('App/Models/Permission')
      .pivotTable('role_permission')
      .withTimestamps()
  }
}

module.exports = Role
