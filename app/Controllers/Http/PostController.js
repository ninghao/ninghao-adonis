'use strict'

const Database = use('Database')

class PostController {
  async index () {
  }

  async create ({ view }) {
    return view.render('post.create')
  }

  async store ({ request }) {
    const newPost = request.only(['title', 'content'])
    const postID = await Database.insert(newPost).into('posts')
    console.log('postID: ', postID)
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
