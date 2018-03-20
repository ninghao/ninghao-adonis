'use strict'

const Database = use('Database')

class PostController {
  async index () {
  }

  async create ({ view }) {
    return view.render('post.create')
  }

  async store ({ request, response }) {
    const newPost = request.only(['title', 'content'])
    const postID = await Database.insert(newPost).into('posts')
    console.log('postID: ', postID)
    return response.redirect(`/posts/${ postID[0] }`)
  }

  async show ({ view, params }) {
    const post = await Database
      .from('posts')
      .where('id', params.id)
      .first()

    return view.render('post.show', { post })
  }

  async edit () {
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = PostController
