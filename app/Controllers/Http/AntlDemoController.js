'use strict'

class AntlDemoController {
  async demo ({ view }) {
    return view.render('demo.antl')
  }
}

module.exports = AntlDemoController
