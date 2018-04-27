'use strict'

const User = use('App/Models/User')

class UserController {
  async index () {
  }

  async create ({ view }) {
    return view.render('user.create')
  }

  async store ({ request, session, response }) {
    const newUser = request.only(['username', 'email', 'password'])
    const user = await User.create(newUser)

    return response.redirect(`/users/${ user.id }`)
  }

  async show ({ params, view, request }) {
    const pageNumber = request.input('page', 1)
    const pageSize = 20

    const user = await User.find(params.id)
    await user.load('profile')

    const posts = await user
      .posts()
      .orderBy('updated_at', 'desc')
      .with('user')
      .paginate(pageNumber, pageSize)

    return view.render('user.show', { user: user.toJSON(), ...posts.toJSON() })

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
