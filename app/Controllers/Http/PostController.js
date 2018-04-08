'use strict'

const Database = use('Database')
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Tag = use('App/Models/Tag')
const { validateAll } = use('Validator')

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
    const tags = await Tag.all()
    return view.render('post.create', { users: users.toJSON(), tags: tags.toJSON() })
  }

  async store ({ request, response, session }) {
    const rules = {
      title: 'required',
      content: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    const newPost = request.only(['title', 'content'])
    const tags = request.input('tags')
    // const postID = await Database.insert(newPost).into('posts')
    // console.log('postID: ', postID)
    // const post = await Post.create(newPost)

    const user = await User.find(request.input('user_id'))
    const post = await user
      .posts()
      .create(newPost)

    await post
      .tags()
      .attach(tags)

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
