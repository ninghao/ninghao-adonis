'use strict'

class PasswordController {
  async edit ({ view }) {
    return view.render('user.settings.password.edit')
  }

  async update () {
  }
}

module.exports = PasswordController
