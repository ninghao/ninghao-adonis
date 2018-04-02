'use strict'

const User = use('App/Models/User')

class UserController {
  async index () {
  }

  async create () {
  }

  async store () {
  }

  async show ({ params }) {
    const user = await User.find(params.id)
    const { username, email } = user.toJSON()
    const profile = await user
      .profile()
      .select('github')
      .fetch()

    return {
      username,
      email,
      profile: profile.toJSON()
    }
  }

  async edit () {
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = UserController
