'use strict'

const { test, trait } = use('Test/Suite')('Post')
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Route = use('Route')

trait('DatabaseTransactions')
trait('Test/ApiClient')
trait('Auth/Client')
trait('Session/Client')

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

test('user should able to add post', async ({ client }) => {
  const user = await User.find(1)
  const post = {
    title: 'hello test',
    content: 'hello test'
  }

  const response = await client
    .post(Route.url('posts.store'))
    .send(post)
    .accept('json')
    .loginVia(user)
    .end()

  response.assertJSONSubset(post)
})
