'use strict'

const Tag = use('App/Models/Tag')

class TagController {
  async index () {
  }

  async create () {
  }

  async store () {
  }

  async show ({ params, view, request }) {
    const pageNumber = request.input('page', 1)
    const pageSize = 20

    const tag = await Tag.find(params.id)
    const posts = await tag
      .posts()
      .orderBy('updated_at', 'desc')
      .with('user')
      .paginate(pageNumber, pageSize)

    return view.render('tag.show', { tag, ...posts.toJSON() })
  }

  async edit () {
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = TagController
