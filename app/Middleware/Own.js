'use strict'

class Own {
  async handle ({ request }, next, args) {

    console.log('hello middleware')
    console.log('args: ', args)

    await next()
  }
}

module.exports = Own
