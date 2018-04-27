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

  async update ({ request, response, auth, session }) {
    const { username, email, github } = request.all()
    const user = auth.user

    if (!user.is_verified) {
      user.merge({ username, email })
    } else {
      user.merge({ username })
    }

    await user.save()

    if (!await user.hasProfile()) {
      await user.profile().create({ github })
    } else {
      await user.profile().update({ github })
    }

    session
      .flash({
        type: 'success',
        message: 'Profile successfully updated.'
      })

    return response.redirect('back')
  }

  async destroy () {
  }
}

module.exports = ProfileController
