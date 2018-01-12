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

Route.on('/').render('welcome')

Route.get('/posts', 'PostController.index')

Route.post('/posts', () => 'Post has been created.')

Route.get('/posts/:id', ({ params }) => {
  return `You're watching post ${ params.id }.`
})

Route.patch('/posts/:id', ({ params }) => {
  return `Post ${ params.id } has been updated.`
})

Route.delete('/posts/:id', ({ params }) => {
  return `Post ${ params.id } has been removed.`
})
