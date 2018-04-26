'use strict'

const { validateAll } = use('Validator')

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
    const rules = {
      username: `required|unique:users,username,id,${ auth.user.id }`,
      email: `required|email|unique:users,email,id,${ auth.user.id }`,
      github: `unique:profiles,github,user_id,${ auth.user.id }`
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }

    const { username, email, github } = request.all()
    auth.user.merge({ username, email })
    await auth.user.save()
    await auth.user.profile().update({ github })

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
