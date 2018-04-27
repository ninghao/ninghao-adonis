'use strict'

const { validateAll } = use('Validator')
const Hash = use('Hash')

class PasswordController {
  async edit ({ view }) {
    return view.render('user.settings.password.edit')
  }

  async update ({ request, response, session, auth }) {
    const rules = {
      old_password: `required|hashVerified:${ auth.user.password }`,
      new_password: 'required|min:6|max:30|confirmed'
    }

    const messages = {
      'old_password.hashVerified': 'Password is invalid'
    }

    const validation = await validateAll(request.all(), rules, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

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
