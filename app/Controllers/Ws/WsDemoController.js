'use strict'

class WsDemoController {
  constructor ({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.user = auth.user || { username: 'Anonymous' }

    console.log('socket.id', socket.id)
    console.log('socket.topic', socket.topic)
  }

  onMessage (message) {
    console.log(message)

    const { username } = this.user
    const { content } = message

    this.socket.broadcastToAll('message', {
      username,
      content
    })
  }
}

module.exports = WsDemoController
