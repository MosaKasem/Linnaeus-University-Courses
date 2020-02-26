/** @deprecated(Mongoose Schema) */
let mongoose = require('mongoose')
/** @deprecated(Hashing Passwords) */
var bcrypt = require('bcrypt-nodejs')
// const regxp = `´!@#$%^&*()+=-[]\\/';,./{}|":<>/||?´`

let userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true, trim: true, lowercase: true},
  password: {type: String, required: true, trim: true}
})
// bind user to this
userSchema.pre('save', function (next) {
  let user = this

  bcrypt.genSalt(10, function (err, salt) {  // let´ salt it aswell!
    if (err) {
      return next(err)
    } else {
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err)
        } else {
          user.password = hash
          next()
        }
      })
    }
  })
})

// comparing passwords to authenticate user
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, res) {
    if (err) {
      return callback(err)
    } else {
      callback(null, res)
    }
  })
}

let User = mongoose.model('usersInLab', userSchema)
module.exports = User
