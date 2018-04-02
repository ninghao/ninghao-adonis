'use strict'

const Model = use('Model')

class Post extends Model {
  tags () {
    return this.belongsToMany('App/Models/Tag')
  }
}

module.exports = Post
