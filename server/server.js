const path = require('path')

const express = require('express')

const publicPath = path.join(__dirname, '../public')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

app.get('/', (req, res) => {
  res.render('some');  
})

app.listen(port, () => console.log('Server up on port', port))

// call app.listen on port 3000 - server is up on port 3000
// 