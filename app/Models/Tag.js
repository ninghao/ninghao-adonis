'use strict'

const Model = use('Model')

class Tag extends Model {
  posts () {
    return this.belongsToMany('App/Models/Post')
  }
}

module.exports = Tag
