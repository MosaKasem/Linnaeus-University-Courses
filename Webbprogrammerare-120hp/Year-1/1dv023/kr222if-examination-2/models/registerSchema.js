/**
 * @author Mosa Kasem Rasol
 * @version 1.1.1
 * @description mongooseSchema for registering a user and password.
*/

let mongoose = require('mongoose')
let bcrypt = require('bcrypt-nodejs')
let Snippets = require('./Snippets')
// tried to data association the snippets accordingly to their creators // due to time constraint, I wasn't able to follow through with bugs.

let userSchema = new mongoose.Schema({
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  snippet: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Snippets'
  }]
})
// Keeping, will it work in routes? if not, switch back to this method.
// userSchema.path('password').validate(password => {
//   if (password.length > 5) return 'password is too short'
// })

// bind user to this.
userSchema.pre('save', function (next) {
  var user = this

// generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)

  // hash the password using our new salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callback(err)
    callback(null, isMatch)
  })
}

let User = mongoose.model('allUsers', userSchema)
module.exports = User
