'use strict'

const Ws = use('Ws')
const Mail = use('Mail')
const Env = use('Env')

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

User.verification = async (user) => {
  const verification = await user.generateVerification()

  await Mail.send(
    'email.verification',
    {
      appURL: Env.get('APP_URL'),
      verification,
      user
    },
    (message) => {
      message
        .to(user.email)
        .from(Env.get('SITE_MAIL'))
        .subject(`Please verify your email ${ user.email }`)
    }
  )
}
