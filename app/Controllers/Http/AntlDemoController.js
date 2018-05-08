'use strict'

const Formats = use('Antl/Formats')

Formats.add('longWeekDay', {
  weekday: 'long'
})

class AntlDemoController {
  async localeSwitch ({ session, response, request }) {
    session.put('locale', request.input('locale'))
    return response.redirect('back')
  }

  async demo ({ view, antl, locale, session }) {
    const _locale = session.get('locale') || locale

    return view.render('demo.antl', {
      locale: _locale,
      // message: antl.formatNumber(0.33333, {
      //   // minimumIntegerDigits: 2,
      //   // minimumFractionDigits: 2,
      //   // maximumFractionDigits: 2,
      //   // style: 'percent'
      // }),
      // message: antl.formatNumber(0.33333, {
      //   style: 'currency',
      //   // currency: 'usd',
      //   currency: 'cny',
      //   // currencyDisplay: 'symbol',
      //   currencyDisplay: 'name',
      // }),
      // message: antl.formatAmount(30, 'usd'),
      // message: antl.formatDate(new Date(), {
      //   // weekday: 'long',
      //   // weekday: 'short',
      //   // month: 'long',
      //   // month: 'short',
      //   // month: 'numeric',
      //   // month: '2-digit',
      //   timeZoneName: 'long',
      //   hour12: false
      // }),
      // message: antl.formatMessage('demo.message', {
      //   // gender: 'male',
      //   gender: 'female',
      // }),
      // message: antl.formatMessage('demo.message', {
      //   // count: 0,
      //   // count: 1,
      //   count: 3,
      // }),
      message: antl.formatMessage('demo.message', { today: new Date() }, [
        Formats.pass('longWeekDay', 'date')
      ])
    })
  }
}

module.exports = AntlDemoController
