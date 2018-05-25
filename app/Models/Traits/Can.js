'use strict'

class Can {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.prototype.can = this.can
  }

  async can () {
    return `hello ${ this.username }`
  }
}

module.exports = Can
