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

  async can () {
    return `hello ${ this.username }`
  }
}

module.exports = Can
