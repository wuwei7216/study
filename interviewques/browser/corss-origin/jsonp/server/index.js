// server.js
let express = require('express')
let app = express()
app.get('/say', function(req, res) {
  let { wd, callback } = req.query
  console.log(wd) // Iloveyou
  console.log(callback) // show
  res.append("Content-Type", "text/plain;charset=utf-8")
  res.end(`${callback}('I love you too!')`)
})
app.listen(3000)
