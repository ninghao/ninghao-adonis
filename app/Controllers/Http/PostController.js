'use strict'

const Database = use('Database')
const Post = use('App/Models/Post')

class PostController {
  async index () {
    const posts = await Post.all()
    return posts
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

  async edit ({ view, params }) {
    const post = await Database
      .from('posts')
      .where('id', params.id)
      .first()

    return view.render('post.edit', { post })
  }

  async update ({ request, params }) {
    const updatedPost = request.only(['title', 'content'])
    await Database
      .table('posts')
      .where('id', params.id)
      .update(updatedPost)
  }

  async destroy ({ request, params }) {
    await Database
      .table('posts')
      .where('id', params.id)
      .delete()

    return 'success'
  }
}

module.exports = PostController
