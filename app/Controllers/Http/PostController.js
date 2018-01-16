'use strict'

class PostController {
  index ({ view }) {
    const pageTitle = 'List of <i>posts</i>'
    const user = {
      name: 'wanghao'
    }
    const entities = [
      { id: 1, title: 'Lemon', content: '🍋' },
      { id: 2, title: 'Watermelon', content: '🍉' }
    ]

    return view.render('posts.index', { pageTitle, user, entities })
  }
}

module.exports = PostController
