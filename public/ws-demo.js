const ws = adonis.Ws()
ws.connect()

const connectionStatus = $('.connection-status')
const connectionStatusText = $('.connection-status .text')
const connectionStatusIcon = $('.connection-status .icon')
const message = $('#message')

ws.on('open', () => {
  connectionStatus.removeClass('text-muted')
  connectionStatusIcon.addClass('text-success')
  connectionStatusText.text('Connected')

  subscribeToChannel()
})

ws.on('close', () => {
  connectionStatus.addClass('text-muted')
  connectionStatusIcon.removeClass('text-success')
  connectionStatusText.text('Disconnected')
})

const subscribeToChannel = () => {
  const demo = ws.subscribe('demo')

  demo.on('message', (message) => {
    console.log(message)
  })
}

message.keyup(function (event) {
  if (event.which === 13) {
    event.preventDefault()

    const messageContent = $(this).val()
    $(this).val('')

    if (messageContent) {
      ws.getSubscription('demo').emit('message', {
        content: messageContent
      })
    }
  }
})
