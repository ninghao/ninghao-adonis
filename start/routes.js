'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route
  .on('/').render('welcome')

//
  // Route
  //   .get('/posts', ({ request }) => request.get())

//
  // Route.post('/posts', ({ request }) => request.post())
  // Route.post('/posts', ({ request }) => request.all())
  // Route.post('/posts', ({ request }) => request.only(['title', 'content']))
  // Route.post('/posts', ({ request }) => request.except(['title', 'content']))
  // Route.post('/posts', ({ request }) => request.input('status', 'draft'))
  // Route.post('/posts', ({ request }) => request.only(['title', 'content']))
  // Route.post('/posts', ({ request }) => request.collect(['title', 'content']))

//
  // Route.get('/posts', ({ request }) => request.headers())
  // Route.get('/posts', ({ request }) => request.header('user-agent'))

//
  // Route.get('/posts', ({ request, response }) => {
  //   // response.header('Content-type', 'text/plain')
  //   response.type('text/plain')
  //   return '<h1>List of posts.</h1>'
  // })

//
  // Route.get('/posts', ({ request, response }) => {
  //   response.cookie('theme', 'dark')
  //   response.clearCookie('theme')
  //   return request.cookie('theme', 'light')
  // })

//
  // Route.get('/posts', ({ response }) => {
  //   // response.send('List of posts.')
  //   return {
  //     title: 'List of posts.'
  //   }
  // })

//
  // const delay = (data, time) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(data)
  //     }, time)
  //   })
  // }
  //
  // Route.get('/posts', async ({ response }) => {
  //   const data = await delay(
  //     'List of posts.',
  //     3000
  //   )
  //   return data
  // })

//
  // Route.get('/list-of-posts', ({ response }) => {
  //   // response.redirect('/posts', true, 301)
  //   response.route('list-of-posts')
  // })
  //
  // Route.get('/list-of-food-posts', ({ response }) => {
  //   // response.redirect('/posts', true, 301)
  //   response.route('list-of-posts', { category: 'food' })
  // })
  //
  // Route.get('/posts/:category?', ({ params }) => {
  //   return `List of ${ params.category || 'default' } posts.`
  // })
  // .as('list-of-posts')
