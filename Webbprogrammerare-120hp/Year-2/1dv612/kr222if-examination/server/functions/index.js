/* eslint-disable promise/always-return */
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodeMailer = require('nodemailer')
// const request = require('request')
// admin.initializeApp(functions.config().firebase)
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://github-firebase-auth.firebaseio.com/'
})

if (process.env.NODE_ENV === 'development') {
  firebase.functions().useFunctionsEmulator('http://localhost:5002')
}
const firestore = admin.firestore()

// const storage = new Storage();

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// // //
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   const promise = admin.firestore().doc('userLoggedIn/0Tvom6RPC4b5Y6mvVzQR').get()
//   .then((result) => {
//     const data = result.data()
//     return response.send(data)
//   }).catch((err) => {
//     console.log(err)
//     return response.status(500).send(err)
//   })
//   console.log('promise: ', promise);
// })

const createNotification = notification => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc))
}

exports.userJoined = functions.firestore
  .document('userLoggedIn/{userLoggedInID}')
  .onCreate(doc => {
    const loggedInUser = doc.data()
    const notify = {
      content: 'User Joined',
      user: loggedInUser.authorName,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notify)
  })

exports.userLoggedIn = functions.firestore
  .document('userLoggedIn/{userLoggedInID}')
  .onUpdate(doc => {
    const loggedInUser = doc.after.data()
    const notify = {
      content: 'User Logged In',
      user: loggedInUser.authorName,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notify)
  })

exports.webhook = functions.https.onRequest((req, res, admin) => {
  const eventPayload = req.body
  console.log(eventPayload)
  const payloadEvent = req.get('X-Github-Event')
  if (payloadEvent !== 'ping') {
    // eventPayload.repository.owner.login
    return new Promise((resolve, reject) => {
      firestore.doc(eventPayload.repository.full_name).get().then(snapshot => {
        const data = snapshot.data()
        if (data.sendMail) {
          sendEmail(data.email, eventPayload, data)
        }
        resolve(data)
      }).catch((err) => reject(err))
    })
  }
  // console.log(JSON.stringify(req.params))

  // const { issue: { user: { login }}, action, repository: { name } } = req.body
  // console.log('name: ', name);
  // console.log('action: ', action);
  // console.log('login: ', login);
  // fetchEmail( login )

  return res.status(200).send('bla')
  // if (payload_event !== 'ping') {
  //   console.log('-------------payload_event-------------\n')
  //   console.log(payload_event)
  //   console.log('-------------payload_event-------------\n')
  // }
  // console.log('--------------(req.path)----------\n')
  // console.log(req.path);
  // console.log('--------------(req.path)----------\n')
})
const sendEmail = (reciever, githubPayLoad, firebaseWebhook) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: functions.config().someservice.user,
      pass: functions.config().someservice.pass
    }
  })

  const mailOptions = {
    from: functions.config().someservice.user,
    to: reciever,
    subject: githubPayLoad.issue.body,
    text: githubPayLoad.issue.body
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error)
      return false
    }

    return true
  })
}

const fetchEmail = (name) => {
  console.log(name)
  return new Promise((resolve, reject) => {
    firestore.doc('MosaKasem/moistpberry').get().then(snapshot => {
      const data = snapshot.data()
      console.log('data: ', data)
      resolve(data)
    }).catch(err => {
      reject(err.message)
    })
  })
}
