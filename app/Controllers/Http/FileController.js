'use strict'

const Helpers = use('Helpers')
const File = use('App/Models/File')
const filesize = use('filesize')
const Drive = use('Drive')
const Route = use('Route')

class FileController {
  async download ({ params, response }) {
    const file = await File.find(params.id)
    const filePath = `${ Helpers.publicPath('uploads') }/${ file.file_name }`

    return response.attachment(filePath, file.client_name)
  }

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

    await file.move(Helpers.publicPath('uploads'), {
      name: fileName
    })

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

  async show ({ params, view }) {
    const file = await File.find(params.id)
    return view.render('file.show', { file: file.toJSON() })
  }

  async edit ({ view, params }) {
    const file = await File.find(params.id)

    return view.render('file.edit', { file })
  }

  async update ({ request, response, params, session }) {
    const fileData = await File.find(params.id)
    const { client_name, file_name } = request.all()

    if (file_name !== fileData.file_name) {
      try {
        const basePath = Helpers.publicPath('uploads')
        const originalFilePath = `${ basePath }/${ fileData.file_name }`
        const filePath = `${ basePath }/${ file_name }`
        await Drive.move(originalFilePath, filePath)
      } catch (error) {
        session.flash({
          type: 'warning',
          message: error.message
        })

        return response.redirect('back')
      }
    }

    fileData.merge({ client_name, file_name })
    await fileData.save()

    session.flash({
      type: 'success',
      message: 'Successfully updated.'
    })

    return response.redirect('back')
  }

  async destroy ({ params, response, session }) {
    try {
      const fileData = await File.findOrFail(params.id)
      const filePath = `${ Helpers.publicPath('uploads') }/${ fileData.file_name }`
      await Drive.delete(filePath)
      await fileData.delete()

      session.flash({
        type: 'success',
        message: `<small>${ fileData.client_name }: </small>successfully deleted.`
      })

      return response.redirect(Route.url('files.index'))
    } catch (error) {
      session.flash({
        type: 'warning',
        message: error.message
      })

      return response.redirect('back')
    }
  }
}

module.exports = FileController
