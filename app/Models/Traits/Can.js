'use strict'

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

    const permissions = [
      ...userPermissions
    ]

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
