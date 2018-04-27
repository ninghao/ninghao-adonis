const { hooks } = require('@adonisjs/ignitor')
const { range } = require('lodash')

hooks.after.providersBooted(() => {
  /**
   * Views global
   */
  const View = use('View')

  // Generate pagination items
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

    let firstItem = [1]
    let lastItem = [lastPage]

    if (pageItemRange + 2 < page) {
      firstItem = [
        ...firstItem,
        '...'
      ]
    }

    if (lastPage - page - 1 > pageItemRange) {
      lastItem = [
        '...',
        ...lastItem
      ]
    }

    if (pageItemRange + 1 < page) {
      pageItems = [
        ...firstItem,
        ...pageItems
      ]
    }

    if (lastPage - page > pageItemRange) {
      pageItems = [
        ...pageItems,
        ...lastItem
      ]
    }

    return pageItems
  })

  // Convert given value to integer
  View.global('parseInt', (value) => {
    return parseInt(value)
  })

  /**
   * Handle Exception
   */
  const Exception = use('Exception')

  // If the user has not logged in, redirect to login page.
  Exception.handle('InvalidSessionException', async (error, { response }) => {
    return response.route('login')
  })

  // Display alert message when permission check failed.
  Exception.handle('PermissionCheckException', async (error, { session, response }) => {
    session
      .flash({
        type: 'danger',
        message: 'You have no permission to do this.'
      })

    await session.commit()

    return response.redirect('back')
  })

  /**
   * Extend Validator
   */
  const Validator = use('Validator')
  const Hash = use('Hash')

  // Verify the user input against the previously hased value using Hash.verify().
  const hashVerified = async (data, field, message, args, get) => {
    const value = get(data, field)

    if (!value) {
      return
    }

    const [ hashedValue ] = args

    const verified = await Hash.verify(value, hashedValue)

    if (!verified) {
      throw message
    }
  }

  Validator.extend('hashVerified', hashVerified)
})
