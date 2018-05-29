'use strict'

/*
|--------------------------------------------------------------------------
| ProfileSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Profile = use('App/Models/Profile')

class ProfileSeeder {
  async run () {
    const profiles = [
      { github: 'wanghao8080', user_id: 1 },
      { github: 'xiaoxue8080', user_id: 2 },
      { github: 'z38080', user_id: 3 },
      { github: 'l48080', user_id: 4 }
    ]

    await Profile.createMany(profiles)
  }
}

module.exports = ProfileSeeder
