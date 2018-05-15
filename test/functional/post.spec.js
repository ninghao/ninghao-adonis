'use strict'

const { test, trait } = use('Test/Suite')('Post')
const Post = use('App/Models/Post')

trait('DatabaseTransactions')

test('use traits in test', async ({ assert }) => {
  const post = {
    title: 'hello test',
    content: 'hello test'
  }

  await Post.create(post)
})
