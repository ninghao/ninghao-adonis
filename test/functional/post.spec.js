'use strict'

const { test, trait } = use('Test/Suite')('Post')
const Post = use('App/Models/Post')
const Route = use('Route')

trait('DatabaseTransactions')
trait('Test/ApiClient')

test('use traits in test', async ({ assert }) => {
  const post = {
    title: 'hello test',
    content: 'hello test'
  }

  await Post.create(post)
})

test('get list of posts', async ({ client }) => {
  const post = {
    title: 'hello test',
    content: 'hello test'
  }

  await Post.create(post)

  const response = await client
    .get(Route.url('posts.index'))
    .header('accept', 'application/json')
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    data: [
      post
    ]
  })
})

test('should redirect to login page when the user did not login', async ({ client }) => {
  const response = await client
    .get(Route.url('posts.create'))
    .end()

  response.assertRedirect(Route.url('login'))
})
