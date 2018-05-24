'use strict'

const Model = use('Model')
const randomstring = use('randomstring')

class User extends Model {
  async hasProfile () {
    const profile = await this.profile().fetch()

    if (!profile) {
      return false
    }

    return true
  }

  verification () {
    return this.hasOne('App/Models/Verification')
  }

  async generateVerification () {
    const token = randomstring.generate({
      length: 6,
      charset: 'numeric'
    })

    const verification = await this.verification().create({
      token
    })

    return verification
  }

  profile () {
    return this.hasOne('App/Models/Profile')
  }

  posts () {
    return this.hasMany('App/Models/Post')
  }

  permissions () {
    return this
      .belongsToMany('App/Models/Permission')
      .pivotTable('user_permission')
      .withTimestamps()
  }

  static boot () {
    super.boot()

    /**
     * A hook to bash the user password before saving
     * it to the database.
     *
     * Look at `app/Models/Hooks/User.js` file to
     * check the hashPassword method
     */
    this.addHook('beforeCreate', 'User.hashPassword')
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
