'use strict'

class LocaleSwitch {
  async handle ({ request, locale, session, antl }, next) {
    const _locale = session.get('locale') || locale
    antl.switchLocale(_locale)
    await next()
  }
}

module.exports = LocaleSwitch
