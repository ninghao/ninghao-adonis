'use strict'

const Model = use('Model')

class Post extends Model {
  tags () {
    return this.belongsToMany('App/Models/Tag')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Post
