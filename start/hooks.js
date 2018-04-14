const { hooks } = require('@adonisjs/ignitor')
const { range } = require('lodash')

hooks.after.providersBooted(() => {
  const View = use('View')

  View.global('pageItems', (lastPage, page) => {
    const allPageItems = range(1, lastPage + 1)
    const pageItemRange = 2
    const pageItemAfter = allPageItems.slice(page, page + pageItemRange)
    const pageItemBefore = allPageItems.slice(page - lastPage - pageItemRange - 1, page - 1)
    let pageItems = [
      ...pageItemBefore,
      page,
      ...pageItemAfter
    ]

    return pageItems
  })

  View.global('parseInt', (value) => {
    return parseInt(value)
  })
})
