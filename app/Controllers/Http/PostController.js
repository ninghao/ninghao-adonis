'use strict'

class PostController {
  index ({ view }) {
    const pageTitle = 'List of posts'
    const user = {
      name: 'wanghao'
    }
    const entities = [
      { id: 1, title: 'Lemon', content: '🍋' },
      { id: 2, title: 'Watermelon', content: '🍉' },
      { id: 3, title: 'Carrot', content: '🥕' }
    ]

    return view.render('posts.index', { pageTitle, user, entities })
  }
}

module.exports = PostController
