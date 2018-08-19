'use strict'

const Database = use('Database')
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Tag = use('App/Models/Tag')
const Route = use('Route')
// const File = use('App/Models/File')
const Helpers = use('Helpers')

class PostController {
  async index ({ view, request, response }) {
    const page = request.input('page')
    const perPage = 20

    const posts = await Post
      .query()
      .orderBy('updated_at', 'desc')
      .with('user', (builder) => {
        builder.select('id', 'username')
      })
      .with('user.profile')
      .paginate(page, perPage)

    const format = request.accepts(['json', 'html'])

    if (format === 'json') {
      return response.send(posts)
    }

    return view.render('post.index', { ...posts.toJSON() })
  }

  async create ({ view, auth }) {
    const userItems = [
      {
        ...auth.user.toJSON(),
        checked: true
      }
    ]

    // const users = await User.all()
    const tags = await Tag.all()
    return view.render('post.create', { users: userItems, tags: tags.toJSON() })
  }

  async store ({ request, response, session, auth }) {
    const newPost = request.only(['title', 'content'])
    const tags = request.input('tags')
    // const postID = await Database.insert(newPost).into('posts')
    // console.log('postID: ', postID)
    // const post = await Post.create(newPost)

    // const user = await User.find(request.input('user_id'))
    const post = await auth.user
      .posts()
      .create(newPost)

    await post
      .tags()
      .attach(tags)

    // 得到创建文章表单里 file 元素里的文件
    const files = request.file('file', {
      types: ['image'],
      size: '20mb'
    })

    // 移动并重命名文件
    await files.moveAll(Helpers.publicPath('uploads'), (file) => {
      return {
        name: `${new Date().getTime()}.${file.subtype}`
      }
    })

    // 得到成功移动的文件
    const movedFiles = files.movedList()

    // 准备要保存在 files 表里的数据
    const _movedFiles = movedFiles.map((file) => {
      return {
        client_name: file.clientName,
        file_name: file.fileName,
        type: file.type,
        subtype: file.subtype,
        size: file.size
      }
    })

    if (!files.movedAll()) {
      return files.errors()
    }

    // 利用 Post 模型里定义的 files 关系，在中间表保存文章与文件的关系
    await post
      .files()
      .createMany(_movedFiles)

    const format = request.accepts(['json', 'html'])

    if (format === 'json') {
      return response.send(posts)
    }

    return response.route('posts.show', { id: post.id })
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

  async edit ({ view, params, auth }) {
    // const post = await Database
    //   .from('posts')
    //   .where('id', params.id)
    //   .first()

    const _post = await Post.findOrFail(params.id)

    const _users = await User.all()
    const users = _users.toJSON()
    const _tags = await Tag.all()
    const tags = _tags.toJSON()
    await _post.loadMany(['tags', 'user'])
    const post = _post.toJSON()
    const postTagIds = post.tags.map(tag => tag.id)

    const tagItems = tags.map((tag) => {
      if (postTagIds.includes(tag.id)) {
        tag.checked = true
      }

      return tag
    })

    let userItems = []

    userItems = [
      {
        ...post.user,
        checked: true
      }
    ]

    if (auth.user.id === 1) {
      userItems = users.map((user) => {
        if (user.id === post.user_id) {
          user.checked = true
        }

        return user
      })
    }

    return view.render('post.edit', {
      post,
      users: userItems,
      tags: tagItems
    })
  }

  async update ({ request, params, session, response, auth }) {
    const { title, content, user_id, tags } = request.all()
    // await Database
    //   .table('posts')
    //   .where('id', params.id)
    //   .update(updatedPost)

    const post = await Post.findOrFail(params.id)
    post.merge({ title, content })
    await post.save()

    if (auth.user.id == 1) {
      const user = await User.find(user_id)
      await post.user().associate(user)
    }

    await post.tags().sync(tags)

    session.flash({
      type: 'primary',
      message: `Post updated. <a href="${ Route.url('PostController.show', { id: post.id }) }" class="alert-link">Preview post.</a>`
    })

    return response.redirect('back')
  }

  async destroy ({ request, params }) {
    // await Database
    //   .table('posts')
    //   .where('id', params.id)
    //   .delete()

    const post = await Post.find(params.id)

    try {
      await post.tags().detach()
      await post.delete()
    } catch (error) {
      console.log(error)
    }

    return 'success'
  }
}

module.exports = PostController
