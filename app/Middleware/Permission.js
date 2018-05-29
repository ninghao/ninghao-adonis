'use strict'

const Role = use('App/Models/Role')

class Permission {
  async handle ({ request, auth }, next) {
    let permissions = []

    if (auth.user) {
      permissions = await auth.user.getPermissions()
    } else {
      const guest = await Role
        .query()
        .where('name', 'guest')
        .with('permissions')
        .first()

      permissions = guest
        .toJSON()
        .permissions
        .map(permission => permission.name)
    }

    request.permissions = permissions

    await next()
  }
}

module.exports = Permission
