'use strict'

const User = use('App/Models/User')

class UserController {
  async index () {
  }

  async create () {
  }

  async store () {
  }

  async show ({ params, view }) {
    const user = await User.find(params.id)

    await user.loadMany({
      posts: builder => builder.select('id', 'title', 'content'),
      profile: builder => builder.select('github')
    })

    return view.render('user.show', { user: user.toJSON() })

    // const { username, email } = user.toJSON()
    // const profile = await user
    //   .profile()
    //   .select('github')
    //   .fetch()
    //
    // const posts = await user
    //   .posts()
    //   .select('title', 'content')
    //   .fetch()
    //
    // return {
    //   username,
    //   email,
    //   profile,
    //   posts
    // }
  }

  async edit () {
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = UserController
