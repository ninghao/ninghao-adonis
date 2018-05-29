'use strict'

const { flatten, uniq } = use('lodash')
const { check } = use('acler')

class Can {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.prototype.can = this.can
    Model.prototype.getPermissions = this.getPermissions
  }

  async getPermissions () {
    const _userPermissions = await this.permissions().fetch()
    const userPermissions = _userPermissions
      .toJSON()
      .map(permission => permission.name)

    const _roles = await this.roles().with('permissions').fetch()
    const _rolePermissions = _roles.toJSON().map(role => role.permissions)
    const rolePermissions = flatten(_rolePermissions).map(permission => permission.name)

    const permissions = uniq([
      ...userPermissions,
      ...rolePermissions
    ])

    return permissions
  }

  async can (permissionExpression) {
    const userPermissions = await this.getPermissions()

    const result = check(permissionExpression, (permission) => {
      return userPermissions.includes(permission)
    })

    return result
  }
}

module.exports = Can
