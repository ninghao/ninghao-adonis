'use strict'

const Ws = use('Ws')

const User = exports = module.exports = {}

User.method = async () => {
}

User.log = async (user) => {
  console.log('user.login: %s just logged in.', user.username)

  Ws
    .getChannel('demo')
    .topic('demo')
    .broadcast('message', {
      username: user.username,
      content: 'just logged in.'
    })
}
