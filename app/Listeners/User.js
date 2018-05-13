'use strict'

const User = exports = module.exports = {}

User.method = async () => {
}

User.log = async (user) => {
  console.log('user.login: %s just logged in.', user.username)
}
