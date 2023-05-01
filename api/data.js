const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const data = {
    message: 'This data is from the server'
  }

  res.json(data)
})

module.exports = router

