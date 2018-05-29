'use strict'

class Is {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.prototype.getRoles = this.getRoles
  }

  async getRoles () {
    const _roles = await this.roles().fetch()
    const roles = _roles.toJSON().map(role => role.name)

    return roles
  }
}

module.exports = Is
