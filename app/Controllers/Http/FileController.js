'use strict'

const Helpers = use('Helpers')

class FileController {
  async index () {
  }

  async create ({ view }) {
    return view.render('file.create')
  }

  async store ({ request, response, session }) {
    const file = request.file('file', {
      types: ['image', 'video'],
      size: '100mb'
    })

    const fileName = `${ new Date().getTime() }.${ file.subtype }`

    await file.move(Helpers.publicPath('uploads', {
      name: fileName
    }))

    if (!file.moved()) {
      const error = file.error()

      session.flash({
        type: 'warning',
        message: `<small>${ error.clientName }</small>: ${ error.message }`
      })

      return response.redirect('back')
    }

    session.flash({
      type: 'success',
      message: `<small>${ file.clientName }</small>: Successfully uploaded.`
    })

    return response.redirect('back')
  }

  async show () {
  }

  async edit () {
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = FileController
