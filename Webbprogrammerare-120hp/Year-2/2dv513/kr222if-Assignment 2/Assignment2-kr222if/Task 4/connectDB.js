'use strict'
/** @description CONNECT TO DATABASE */
const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('../redditsubWithTimer.db')

/*
With constrains

    CREATE TABLE if not exists Post (id (VARCHAR 10),
      name (TEXT 20),
      parent_id (VARCHAR 30),
      link_id (VARCHAR 40),
      author (TEXT 30),
      body (TEXT 30000),
      subreddit_id (VARCHAR 25),
      score (INT 10000),
      created_UTC (INT 20),
      FOREIGN KEY (subreddit_id) REFERENCES Subreddit(subreddit_id))

*/

let createDB = function () {
  db.on('open', () => {
    console.log('open connection')
    db.run(`
    CREATE TABLE if not exists Post (id VARCHAR, 
      name TEXT, 
      parent_id VARCHAR, 
      link_id VARCHAR, 
      author TEXT, 
      body TEXT, 
      subreddit_id VARCHAR, 
      score INT, 
      created_UTC INT, 
      FOREIGN KEY (subreddit_id) REFERENCES Subreddit(subreddit_id))
    `)
    db.run(`
    CREATE TABLE if not exists Subreddit(subreddit_id, subreddit)
    `)
  })
}
let insertToDataBase = function (arrayOfSubs, arrayOfPosts) {
  console.log('Begin Uploading')
  db.serialize(() => {
    db.run('BEGIN TRANSACTION', () => {
      let relationTuple = db.prepare(`
      INSERT INTO Post(
        id,
        name,
        parent_id,
        link_id,
        author,
        body,
        subreddit_id,
        score,
        created_UTC) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      let relationSubreddit = db.prepare(`
      INSERT OR IGNORE INTO Subreddit(subreddit_id, subreddit)
      VALUES (?, ?)`)
      arrayOfPosts.forEach(data => {
        relationTuple.run([data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8]], () => {
        })
      })
      console.log('kill me ya allah')
      arrayOfSubs.forEach(data => {
        relationSubreddit.run([data[0], data[1]])
      })
      db.run('COMMIT')
    })
  })
}

module.exports = {
  createDB: createDB,
  insertToDataBase: insertToDataBase,
  db: db
}
