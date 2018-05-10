'use strict'

class WsDemoController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request

    console.log('socket.id', socket.id)
    console.log('socket.topic', socket.topic)
  }

  onMessage (message) {
    console.log(message)

    this.socket.broadcastToAll('message', message)
  }
}

module.exports = WsDemoController
