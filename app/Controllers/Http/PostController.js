'use strict'

class PostController {
  index ({ view }) {
    const pageTitle = 'List of <i>posts</i>'

    return view.render('posts.index', { pageTitle })
  }
}

module.exports = PostController
