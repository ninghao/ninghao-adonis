'use strict'

class AntlDemoController {
  async demo ({ view, antl, locale }) {
    return view.render('demo.antl', {
      locale,
      message: 'hello'
    })
  }
}

module.exports = AntlDemoController
