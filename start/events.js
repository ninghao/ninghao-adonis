const Event = use('Event')

Event.on('user.login', async (user) => {
  console.log('user.login: %s just logged in.', user.username)
})
