'use strict'

class Greeting {
  constructor (Config) {
    this.Config = Config
  }

  hello () {
    const greeting = this.Config.get('demo.greeting')
    return greeting
  }
}

module.exports = Greeting
