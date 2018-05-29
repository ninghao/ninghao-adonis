'use strict'

class Role {
  async handle ({ request, auth }, next) {
    let roles = []

    if (auth.user) {
      roles = await auth.user.getRoles()
    } else {
      roles = ['guest']
    }

    request.roles = roles

    await next()
  }
}

module.exports = Role
