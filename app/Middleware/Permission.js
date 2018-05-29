'use strict'

class Permission {
  async handle ({ request, auth }, next) {
    let permissions = []

    if (auth.user) {
      permissions = await auth.user.getPermissions()
    } else {
      permissions = ['read post']
    }

    request.permissions = permissions

    await next()
  }
}

module.exports = Permission
