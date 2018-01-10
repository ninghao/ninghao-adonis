'use strict'

class HelloController {
  render ({ request }) {
    return `hello ~ ${ request.input('name') }`
  }
}

module.exports = HelloController
