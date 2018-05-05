'use strict'

class AntlDemoController {
  async demo ({ view, antl }) {
    return view.render('demo.antl', {
      greeting: antl.formatMessage('demo.greeting')
    })
  }
}

module.exports = AntlDemoController
