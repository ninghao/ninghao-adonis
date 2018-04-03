'use strict'

const Database = use('Database')
const Post = use('App/Models/Post')
const User = use('App/Models/User')

class PostController {
  async index ({ view }) {
    const posts = await Post
      .query()
      .with('user', (builder) => {
        builder.select('id', 'username')
      })
      .with('user.profile')
      .fetch()

    console.log(posts.toJSON())
    // console.log(posts)
    // return posts
    return view.render('post.index', { posts: posts.toJSON() })
  }

  async create ({ view }) {
    const users = await User.all()
    return view.render('post.create', { users: users.toJSON() })
  }

  async store ({ request, response }) {
    const newPost = request.only(['title', 'content'])
    // const postID = await Database.insert(newPost).into('posts')
    // console.log('postID: ', postID)
    const post = await Post.create(newPost)
    return response.redirect(`/posts/${ post.id }`)
  }

  async show ({ view, params }) {
    // const post = await Database
    //   .from('posts')
    //   .where('id', params.id)
    //   .first()

    const post = await Post.findOrFail(params.id)

    const tags = await post
      .tags()
      .select('id', 'title')
      .fetch()

    return view.render('post.show', { post, tags: tags.toJSON() })
  }

  async edit ({ view, params }) {
    // const post = await Database
    //   .from('posts')
    //   .where('id', params.id)
    //   .first()

    const post = await Post.findOrFail(params.id)

    return view.render('post.edit', { post: post.toJSON() })
  }

  async update ({ request, params }) {
    const updatedPost = request.only(['title', 'content'])
    // await Database
    //   .table('posts')
    //   .where('id', params.id)
    //   .update(updatedPost)

    const post = await Post.findOrFail(params.id)
    post.merge(updatedPost)
    post.save()
  }

  async destroy ({ request, params }) {
    // await Database
    //   .table('posts')
    //   .where('id', params.id)
    //   .delete()

    const post = await Post.find(params.id)
    post.delete()

    return 'success'
  }
}

module.exports = PostController
