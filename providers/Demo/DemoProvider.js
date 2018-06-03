'use strict'

const { ServiceProvider }  = require('@adonisjs/fold')

class DemoProvider extends ServiceProvider {
  register () {
    this.app.singleton('Ninghao/Demo/Greeting', () => {
      const Greeting = require('./src/Greeting')
      return new Greeting()
    })
  }

  boot () {

  }
}

module.exports = DemoProvider
