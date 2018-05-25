'use strict'

const PermissionCheckException = use('App/Exceptions/PermissionCheckException')

class Can {
  async handle ({ auth }, next, args) {
    const permissions = args
    const can = await auth.user.can(permissions)

    if (!can) {
      throw new PermissionCheckException
    }

    await next()
  }
}

module.exports = Can
