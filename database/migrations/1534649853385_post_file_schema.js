'use strict'

const Schema = use('Schema')

class PostFileSchema extends Schema {
  up () {
    this.create('post_file', (table) => {
      table.increments()
      table.integer('post_id').unsigned()
      table.foreign('post_id').references('posts.id')
      table.integer('file_id').unsigned()
      table.foreign('file_id').references('files.id')
    })
  }

  down () {
    this.drop('post_file')
  }
}

module.exports = PostFileSchema
