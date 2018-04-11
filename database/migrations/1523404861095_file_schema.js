'use strict'

const Schema = use('Schema')

class FileSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table.string('client_name')
      table.string('file_name')
      table.string('type')
      table.string('subtype')
      table.integer('size')
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FileSchema
