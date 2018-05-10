'use strict'

class WsDemoController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request

    console.log('socket.id', socket.id)
    console.log('socket.topic', socket.topic)
  }
}

module.exports = WsDemoController
