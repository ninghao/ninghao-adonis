'use strict'

const Model = use('Model')
const filesize = use('filesize')

class File extends Model {
  getSize (size) {
    return filesize(size)
  }
}

module.exports = File
