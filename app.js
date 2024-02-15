const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Entry = require('./models/entry')

const config = require('./utils/config')

const entryRouter = require('./controllers/entries')

app.use(express.json())
mongoose.connect(config.MONGODB_URI).then(result => 
    {console.log("Connected to MongoDB Database")}
  )

app.use('/api/entry', entryRouter)
app.use(cors())

module.exports = app