'use strict'

const Tag = use('App/Models/Tag')

class TagController {
  async index () {
  }

  async create () {
  }

  async store () {
  }

  async show ({ params, view }) {
    const tag = await Tag.find(params.id)
    const posts = await tag
      .posts()
      .select('id', 'title', 'content')
      .fetch()

    return view.render('tag.show', { tag, posts: posts.toJSON() })
  }

  async edit () {
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = TagController
