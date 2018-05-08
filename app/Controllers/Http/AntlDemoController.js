'use strict'

class AntlDemoController {
  async demo ({ view, antl, locale }) {
    return view.render('demo.antl', {
      greeting: antl.formatMessage('demo.greeting', { name: 'wanghao' }),
      locale
    })
  }
}

module.exports = AntlDemoController
