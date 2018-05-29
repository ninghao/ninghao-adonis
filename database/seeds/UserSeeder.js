'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    const users = [
      { username: '王皓', email: 'wanghao@ninghao.net', password: '111111' },
      { username: '小雪', email: 'xiaoxue@ninghao.net', password: '111111' },
      { username: '张三', email: 'z3@ninghao.net', password: '111111' },
      { username: '李四', email: 'l4@ninghao.net', password: '111111' }
    ]

    await User.createMany(users)
  }
}

module.exports = UserSeeder
