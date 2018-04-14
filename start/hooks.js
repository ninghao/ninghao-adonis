const { hooks } = require('@adonisjs/ignitor')
const { range } = require('lodash')

hooks.after.providersBooted(() => {
  const View = use('View')

  View.global('pageItems', (lastPage, page) => {
    const allPageItems = range(1, lastPage + 1)
    return allPageItems
  })

  View.global('parseInt', (value) => {
    return parseInt(value)
  })
})
