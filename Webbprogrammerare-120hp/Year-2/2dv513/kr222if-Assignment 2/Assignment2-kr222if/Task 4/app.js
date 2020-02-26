let dbms = require('./connectDB')
dbms.createDB()

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('../RC_2007-10').setEncoding('utf8')
})
/* let streamReaderForSubReddit = function () {
  return new Promise((resolve, reject) => { */
let promises = []
console.time('Stream_Line_Reader_Timer')
console.time('SQL_Insert_Data_Timer')
lineReader.on('line', function (line) {
  // lineReader.pause()
  // setTimeout(() => {
  let data = JSON.parse(line)
  promises.push(data)
    // lineReader.resume()
  // }, 0)
})
lineReader.on('close', function () {
  console.timeEnd('Stream_Line_Reader_Timer')
  console.log('inside promise-')
  let arrayOfSubReddit = []
  let arrayOfPosts = []
  for (var sub in promises) {
    let subs = []
    let posts = []
    try {
      subs[0] = promises[sub]['subreddit_id']
      subs[1] = promises[sub]['subreddit']

      posts[0] = promises[sub]['id']
      posts[1] = promises[sub]['name']
      posts[2] = promises[sub]['parent_id']
      posts[3] = promises[sub]['link_id']
      posts[4] = promises[sub]['author']
      posts[5] = promises[sub]['body']
      posts[6] = promises[sub]['subreddit_id']
      posts[7] = promises[sub]['score']
      posts[8] = promises[sub]['created_utc']
    } catch (err) {
      console.error(err)
    }
    arrayOfSubReddit.push(subs)
    arrayOfPosts.push(posts)
  }
  dbms.insertToDataBase(arrayOfSubReddit, arrayOfPosts)
  console.timeEnd('SQL_Insert_Data_Timer')
})
/*     resolve(promises)
  })
} */
/* var promise = streamReaderForSubReddit()
promise.then((data) => {
  console.log('inside promise-')
  let arrayOfSubReddit = []
  let arrayOfPosts = []
  for (var sub in data) {
    let subs = []
    let posts = []
    try {
      subs[0] = data[sub]['subreddit_id']
      subs[1] = data[sub]['subreddit']

      posts[0] = data[sub]['id']
      posts[1] = data[sub]['name']
      posts[2] = data[sub]['parent_id']
      posts[3] = data[sub]['link_id']
      posts[4] = data[sub]['author']
      posts[5] = data[sub]['body']
      posts[6] = data[sub]['subreddit_id']
      posts[7] = data[sub]['score']
      posts[8] = data[sub]['created_utc']
    } catch (err) {
      console.error(err)
    }
    arrayOfSubReddit.push(subs)
    arrayOfPosts.push(posts)
  }
  dbms.insertToDataBase(arrayOfSubReddit, arrayOfPosts)
}) */
/* promise.then(function (data) {
  let dataArr = []
  dataArr.push(data)
  dataArr.forEach(element => {
    console.log(element.name)
  })
}).catch((err) => {
  console.error(err)
}) */

/* let streamreader = fs.createReadStream('../RC_2007-10')
streamreader.on('data', (data) => {
  data.forEach(element => {

  })
})
 */
