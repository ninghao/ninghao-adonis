'use strict'

const { check } = use('acler')

class Is {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.prototype.getRoles = this.getRoles
    Model.prototype.is = this.is
  }

  async getRoles () {
    const _roles = await this.roles().fetch()
    const roles = _roles.toJSON().map(role => role.name)

    return roles
  }

  async is (roleExpression,) {
    const userRoles = await this.getRoles()

    const result = check(roleExpression, (role) => {
      return userRoles.includes(role)
    })

    return result
  }
}

module.exports = Is
