'use strict'

class Own {
  async handle ({ request }, next) {

    console.log('hello middleware')

    await next()
  }
}

module.exports = Own
