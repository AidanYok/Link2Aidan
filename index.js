const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.static('public'))
app.use(favicon(__dirname + '/public/favicon.ico'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...')
})

