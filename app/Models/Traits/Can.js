'use strict'

const { flatten, uniq } = use('lodash')

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

  async can (permissions, all = true) {
    const userPermissions = await this.getPermissions()

    if (Array.isArray(permissions)) {
      const result = permissions.map((permission) => {
        return userPermissions.includes(permission)
      })

      return all ? !result.includes(false) : result.includes(true)
    }

    return userPermissions.includes(permissions)
  }
}

module.exports = Can
