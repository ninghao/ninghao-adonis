'use strict'

class AntlDemoController {
  async demo ({ view, antl, locale }) {
    return view.render('demo.antl', {
      locale,
      message: antl.formatNumber(0.33333, {
        // minimumIntegerDigits: 2,
        // minimumFractionDigits: 2,
        // maximumFractionDigits: 2,
        style: 'percent'
      })
    })
  }
}

module.exports = AntlDemoController
