const entryRouter = require('express').Router()
const Entry = require('../models/entry')

// Get All
entryRouter.get('/', async (request, response) => {
  const entries = await Entry.find({})
  console.log(new Date().toISOString().slice(0, 10))
  response.json(entries)
})

entryRouter.get('/users/:user', async(request, response) => {
  const entries = await Entry.find({"user": request.params.user})
  response.json(entries)
})

entryRouter.get('/users/:user/:date', async(request, response) => {
  console.log("Get user/date called")
  const entries = await Entry.find({"user": request.params.user, "date": request.params.date})
  response.json(entries)
})


// Create New Entry
entryRouter.post('/', async (request, response) => {
  const entry = new Entry(request.body)
  try {
    console.log("Attempting posting")
    const newEntry = await entry.save()
    response.status(201).json(newEntry)
    console.log("Posting successful")
  } 
  catch(exception) {
    console.log("Exception caught")
    response.status(400).json(exception)
  }
})

// Get Entry by ID
entryRouter.get('/:id', async (request, response) => {
  console.log("get by ID called")
  try {
    const currEntry = await Entry.findById(request.params.id)
    if (currEntry) {
      response.json(currEntry)
    }
    else {
      response.status(404).end()
    }
  }
  catch(exception) {response.status(404).send(exception)}
})

// Delete Entry by ID
entryRouter.delete('/:id', async (request, response) => {
  try {
    await Entry.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  catch(exception) {
    console.log("exception", exception)
    response.status(404).send(exception)
  }
})

// Update Entry by ID
// Todo : input checking
entryRouter.put('/:id', async (request, response) => {
  const body = request.body
  const origEntry = await Entry.findById(request.params.id)
  const newEntry = {
    "title":        body.title        ? body.title : origEntry.title,
    "user" :        body.user         ? body.user  : origEntry.user,
    "importance":   body.importance   ? body.importance : origEntry.importance,
    "date":         body.date         ? body.date : origEntry.date,
    "sched_time":   body.sched_time   ? body.sched_time : origEntry.sched_time,
    "sched_time_r": body.sched_time_r ? body.sched_time_r : origEntry.sched_time_r,
    "description":  body.description  ? body.description : origEntry.description,
    "url":          body.url          ? body.url : origEntry.url,
    "elapsed":      body.elapsed      ? body.elapsed : origEntry.elapsed,
    "completed":    body.completed    ? body.completed : origEntry.completed,
  }
  try {
    const update = await Entry.findByIdAndUpdate(request.params.id, newEntry, {new : true})
    response.json(update)
  }
  catch(exception) {
    response.status(400).json(exception)
  }
})


module.exports = entryRouter