'use strict'

const Hash = use('Hash')

class PasswordController {
  async edit ({ view }) {
    return view.render('user.settings.password.edit')
  }

  async update ({ request, response, session, auth }) {
    const { new_password } = request.all()
    auth.user.password = await Hash.make(new_password)
    await auth.user.save()

    session.flash({
      type: 'success',
      message: 'Password successfully updated.'
    })

    return response.redirect('back')
  }
}

module.exports = PasswordController
