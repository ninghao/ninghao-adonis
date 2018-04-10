'use strict'

const Helpers = use('Helpers')

class FileController {
  async index () {
  }

  async create ({ view }) {
    return view.render('file.create')
  }

  async store ({ request, response }) {
    const file = request.file('file', {
      types: ['image', 'video'],
      size: '20mb'
    })

    const fileName = `${ new Date().getTime() }.${ file.subtype }`

    await file.move(Helpers.publicPath('uploads', {
      name: fileName
    }))

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
