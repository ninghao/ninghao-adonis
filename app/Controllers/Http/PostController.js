'use strict'

class PostController {
  index ({ view }) {
    const pageTitle = 'List of <i>posts</i>'
    const user = {
      name: 'wanghao'
    }

    return view.render('posts.index', { pageTitle, user })
  }
}

module.exports = PostController
