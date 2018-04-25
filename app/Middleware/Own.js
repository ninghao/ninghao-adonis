'use strict'

const Post = use('App/Models/Post')

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
      session
        .flash({
          type: 'danger',
          message: 'You have no permission to do this.'
        })

      await session.commit()

      return response.redirect('back')
    }

    await next()
  }
}

module.exports = Own
