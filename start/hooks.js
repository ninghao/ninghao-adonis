const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const View = use('View')

  View.global('parseInt', (value) => {
    return parseInt(value)
  })
})
