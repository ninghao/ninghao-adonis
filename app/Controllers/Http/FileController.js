'use strict'

const Helpers = use('Helpers')
const File = use('App/Models/File')

class FileController {
  async index ({ view }) {
    const _files = await File.all()
    const files = _files.toJSON()

    return view.render('file.index', { files })
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

    await File.create({
      client_name: file.clientName,
      file_name: fileName,
      type: file.type,
      subtype: file.subtype,
      size: file.size
    })

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
