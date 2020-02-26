/**
 * @author Mosa Kasem Rasol
 * @version 1.1.2
 * @description I decided to have all routes
*/

let router = require('express').Router()
let bodyParser = require('body-parser')
var iChars = "!@#$%^&*()+=-[]\\';,./{}|\":<>/||?"
let Snippet = require('../models/Snippets')
let User = require('../models/registerSchema')
let authenticate = require('../server')
let csurf = require('csurf')
let csrfProtection = csurf()
router.use(csrfProtection)
router.use(bodyParser.urlencoded({extended: true}))

// home page, if user-signed in, render same page but show signout button, see: home.hbs
router.route('/').get(function (requ, resp) {
  if (requ.session.user) {
    resp.render('home/home', {
      user: 'Signout'
    })
  } else {
    resp.render('home/home')
  }
})

// look in database for a valid user.
// verify password.
// flash some messages to let the user know
router.route('/login').get(isLoggedIn, function (request, response, next) {
  response.render('login', {
    csrfToken: request.csrfToken()
  })
}).post(function (req, res) {
  let userName = req.body.userName
  let password = req.body.password
  let user = new User({
    userName: userName,
    password: password
  })
  // checks if username exists in database.
  User.findOne({'userName': user.userName}, function (err, userFound) {
    if (err) {
      console.error(err)
    } else if (userFound) {
      // if username exists in database, checks password to that username.
      userFound.comparePassword(password, function (err, found) {
        if (err) {
          console.error(err)
        } if (found) {
          req.session.regenerate(() => {
            req.session.flash = {
              type: 'alert alert-secondary', // Add some classes for the css
              message: 'Welcome ' + user.userName + '! Access is now granted!'
            }
            req.session.user = user.userName
            res.redirect('/snippets')
          })
        } else {
          req.session.flash = {
            type: 'alert alert-danger',
            message: 'Incorrect login info'
          }
          res.redirect('#')
        }
      })
    } else {
      req.session.flash = {
        type: 'alert alert-danger',
        message: 'User Not Found' // Could'v opt'ed not to show if the attacker got the right userName, but in this case, i wanted to experiment.
      }
      res.redirect('#')
    }
  })
})
/**
 * There were more ways to present error/flash messages to the user.
 * Flash partials less code, have a use function to reset the value. however I wanted to try my options.
 * @description (req.check) inbuilt methods to check and set limit on max&min characters.
 * @class {registerSchema} using the mongoose SchemaModel to store name&pass in mdlab as an object.
 */
router.route('/register').get(signOutFirst, function (request, response, next) {
  response.render('register', {
    title: 'Registration',
    success: request.session.success,
    errors: request.session.errors,
    csrfToken: request.csrfToken()
  })
  request.session.errors = null
  request.session.success = null
}).post(function (req, res, next) {
  let username = req.body.username
  let password = req.body.password
  // check
  req.check('username', `Username has to be atleast minimum 5 and maximum 12 characters`).isLength({min: 5, max: 12})
  req.check('password', 'Password is invalid').isLength({min: 5}).equals(req.body.confirmPassword)
  let errors = req.validationErrors()
  if (errors) {
    req.session.errors = errors
    req.session.success = false
  } else {
    // req.session.success = true
    let user = new User({
      userName: username,
      password: password
    })
    // implement protection against regex /""<> and more...
    // if procedure is accordingly to the check, then save to db.
    user.save(function (err, data) {
      if (err) {
        // req.session.regenerate(() => {
        req.session.flash = {
          type: 'alert alert-secondary', // Add some classes for the css
          message: 'Username Taken'
        }
        res.redirect('/register')
        console.log(err.stack)
        // })
      } else {
        req.session.success = true
        res.redirect('/register')
      }
    })
  }
  // res.redirect('/register')
})

/**
 * @see (authorize) - to create a snippet - call authorize function as middleware to check if user is logged in.
 * @see (Models\Snippets.js) used mongooseSchema to create the snippet, store the name of the currently logged in user and current date.
 */
router.route('/makeSnip').get(authorize, function (request, response) {
  response.render('snippet')
}).post(function (request, response) {
  let theSnippet = request.body.makingsnippet
  if (theSnippet.length <= 0) {
    request.session.flash = {
      type: 'alert alert-warning',
      message: 'write something'
    }
    response.redirect('/register')
  } else {
    let snip = new Snippet({
      code: request.body.makingsnippet,
      userID: request.session.user
    })
    snip.save().then(function () {
      response.redirect('/snippets')
    }).catch((err) => console.log(`${err.stack}`))
  }
})
/**
 * @param  {request, response}
 * all snippets are presented here, author/dateCreatedAt/Snippet/etc.
 * Idea of "updatedAt:" was to either show the old snippet like in github, or date (double date was ugly, changed it to show user's name, dont let object name confuse you.)
 */
router.route('/snippets').get(function (request, response) {
  Snippet.find({}, function (err, data) {
    if (err) return console.log(`routes snippets.js Error: s${err.stack}`)
    let textArea = {
      theSnippets: data.map(function (theSnippet) {
        return {
          code: theSnippet.code,
          createdAt: theSnippet.createdAt,
          id: theSnippet._id,
          userID: theSnippet.userID,
          updatedAt: theSnippet.updatedAt
        }
      })
    }
    if (!request.session.user) {
      response.render('showSnippetsLogout', textArea)
    } if (request.session.user) {
      response.render('showSnippets', textArea)
    }
  }).catch((err) => console.log(err.stack))
})
// every object stored in mlab gets a unique id.
// grab that snippet's {{id}}, render page with a yes (to delete) and cancel (to cancel)
/**
 * @function authorize - middleware, check if user is logged in
 */
router.route('/delete/:id').get(authorize, function (request, response) {
  Snippet.find({_id: request.params.id}, function (err, data) {
    if (err) {
      console.log(`An error ${err}`)
    } if (data[0].userID !== request.session.user) { // check, does that snippet belong to that user? if not, deny. if yes, proceed to render delete page.
      request.session.flash = {
        type: 'alert alert-warning',
        message: `Permission denied!`
      }
      response.redirect('/snippets')
    } else {
      response.render('deleteSnip', {id: request.params.id})
    }
  })
}).post(function (request, response) {
  Snippet.deleteOne({ _id: request.params.id }, function (err) {
    if (err) return console.log(err.stack)
    response.redirect('/snippets')
  })
})
/**
 * @function (authorize) - middleware to check if user is logged in.
 * @see checkAuthor - couldn't get it work properly, how to handle it with render?
 */
router.route('/edit/:id').get(authorize, function (request, response) {
  Snippet.find({_id: request.params.id}, function (err, data) {
    if (err) {
      return console.log(`routes snippets.js Error: s${err.stack}`)
    } else {
      // checkAuthor(data, request) // Wanted it as middleware, but couldn't reach snippet_created by (this user) to compare with req.session(this user)
      if (data[0].userID !== request.session.user) {
        request.session.flash = {
          type: 'alert alert-warning',
          message: `Permission denied!`
        }
        response.redirect('/snippets')
      } else {
        response.render('edit', {code: data[0].code, id: request.params.id}) // show snippet, get the id in order for edit's submit/post to work.
      }
    }
  })
  // Updating an existing snippet_id
}).post(function (req, res) {
  let snippet = req.body.editTheSnip
  if (snippet.length === 0) {
    req.session.flash = {
      type: 'alert alert-warning',
      message: 'write something'
    }
  } else {
    Snippet.findOneAndUpdate({_id: req.params.id}, {
      code: snippet,
      updatedAt: req.session.user
    }, function (err) {
      if (err) {
        req.session.flash = {
          type: 'alert alert-warning',
          message: 'Update Failed'
        }
        throw new Error('An error has occured' + err)
      }
      req.session.flash = {
        type: 'alert alert-success',
        message: 'Snippet Updated!'
      }
      res.redirect('/snippets')
    })
  }
})

/**
 * idea was: check if that snippet belonged to that user, then render the edit/delete page. Where/how to handle response.render?
*function checkAuthor (data, req) {
*  if (data[0].userID !== req.session.user) {
*    req.session.flash = {
*      type: 'alert alert-warning',
*      message: 'Access Restricted'
*    }
*  }
*}
*/

// middleware, if user tries to log in when he is already logged in.
function isLoggedIn (req, res, next) {
  if (req.session.user) {
    req.session.flash = {
      type: 'alert alert-warning',
      message: `You're already logged in as ${req.session.user}`
    }
    res.redirect('/')
  } else {
    next()
  }
}
// middleware, if user is signed in and wants to register a new account then(signOutFirst)
function signOutFirst (req, res, next) {
  if (req.session.user) {
    req.session.flash = {
      type: 'alert alert-warning',
      message: `Sign out to register a new account`
    }
    res.redirect('/')
  } else {
    next()
  }
}

// middleware, check for: if session.cookie has a user
function authorize (req, res, next) {
  if (req.session.user) {
    next()
  } else {
    req.session.flash = {
      type: 'alert alert-danger',
      message: 'Login first!'
    }
    res.redirect('/')
  }
}
module.exports = router
