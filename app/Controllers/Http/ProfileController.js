'use strict'

class ProfileController {
  async index () {
  }

  async create () {
  }

  async store () {
  }

  async show () {
  }

  async edit ({ view, auth }) {
    await auth.user.load('profile')
    return view.render('user.settings.profile.edit', { user: auth.user.toJSON() })
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = ProfileController
