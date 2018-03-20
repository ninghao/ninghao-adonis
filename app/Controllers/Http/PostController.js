'use strict'

class PostController {
  async index () {
  }

  async create ({ view }) {
    return view.render('post.create')
  }

  async store () {
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

module.exports = PostController
