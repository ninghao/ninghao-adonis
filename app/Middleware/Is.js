'use strict'

const PermissionCheckException = use('App/Exceptions/PermissionCheckException')

class Is {
  async handle ({ auth }, next, args) {
    const roles = args

    const result = await auth.user.is(roles)

    if (!result) {
      throw new PermissionCheckException()
    }

    await next()
  }
}

module.exports = Is
