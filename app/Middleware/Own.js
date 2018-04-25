'use strict'

const Post = use('App/Models/Post')
const PermissionCheckException = use('App/Exceptions/PermissionCheckException')

class Own {
  async handle ({ request, params, auth, session, response }, next, args) {
    // console.log('hello middleware')
    // console.log('args: ', args)

    const entityType = args[0]
    let entity = {}

    if (entityType === 'post') {
      entity = await Post.find(params.id)
    }

    const own = entity.user_id === auth.user.id

    if (!own && auth.user.id !== 1) {
      throw new PermissionCheckException('Permission check exception.', 403)
    }

    await next()
  }
}

module.exports = Own
