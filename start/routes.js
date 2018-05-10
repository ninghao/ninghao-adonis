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
const Profile = use('App/Models/Profile')

Route.on('/').render('welcome')

Route
  .get('demo/ws', ({ view }) => {
    return view.render('demo.ws')
  })

Route
  .post('locale-switch', 'AntlDemoController.localeSwitch')
  .as('localeSwitch')

Route
  .get('demo/antl', 'AntlDemoController.demo')

Route
  .get('users/verification/:token', 'VerificationController.verify')
  .as('verification.email')

Route
  .post('users/verification/resend', 'VerificationController.resend')
  .as('verification.resend')

Route
  .group(() => {
    Route.get('profile', 'ProfileController.edit').as('profile.edit')
    Route
      .post('profile', 'ProfileController.update')
      .as('profile.update')
      .validator('UpdateProfile')
    Route.get('password', 'PasswordController.edit').as('password.edit')
    Route
      .post('password', 'PasswordController.update')
      .as('password.update')
      .validator('UpdatePassword')
  })
  .prefix('settings')
  .middleware(['auth'])

Route
  .post('share/:type/:id/email', 'ShareController.email')
  .as('share.email')

Route
  .get('files/:id/download', 'FileController.download')
  .as('files.download')

Route
  .get('upload', 'FileController.create')
  .as('upload')
Route.resource('files', 'FileController')

Route
  .post('logout', 'AuthController.logout')
  .as('logout')

Route
  .get('login', 'AuthController.login')
  .as('login')

Route
  .post('auth', 'AuthController.auth')
  .as('auth')

Route
  .get('register', 'UserController.create')
  .as('signup')

Route
  .get('users/create', ({ response }) => response.route('signup'))

Route
  .resource('posts', 'PostController')
  .middleware(new Map([
    [['create', 'store', 'edit', 'update', 'destroy'], ['auth']],
    [['update', 'destroy', 'edit'], ['own:post']]
  ]))
  .validator(new Map([
    [['posts.store', 'posts.update'], ['StorePost']]
  ]))

Route
  .resource('users', 'UserController')
  .validator(new Map([
    [['users.store'], ['StoreUser']]
  ]))

Route.resource('tags', 'TagController')

Route.get('profiles/:id', async ({ params }) => {
  const profile = await Profile.find(params.id)
  const user = await profile
    .user()
    .select('username')
    .fetch()

  return {
    profile,
    user
  }
})
