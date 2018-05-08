'use strict'

class AntlDemoController {
  async demo ({ view, antl, locale }) {
    return view.render('demo.antl', {
      locale,
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
      message: antl.formatDate(new Date(), {
        // weekday: 'long',
        // weekday: 'short',
        // month: 'long',
        // month: 'short',
        // month: 'numeric',
        // month: '2-digit',
        timeZoneName: 'long',
        hour12: false
      })
    })
  }
}

module.exports = AntlDemoController
