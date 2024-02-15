const entryRouter = require('express').Router()
const Entry = require('../models/entry')

entryRouter.get('/', async (request, response) => {
  const entries = await Entry.find({})
  response.json(entries)
})

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

entryRouter.get('/:id', async (request, response) => {
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

entryRouter.delete('/:id', async (request, response) => {
  try {
    await Entry.findByIdAndDelete(request.params.id)
    response.status(204)
  }
  catch(exception) {
    response.status(404).send(exception)
  }
})

// Todo : input checking
entryRouter.put('/:id', async (request, response) => {
  const body = request.body
  const origEntry = await Entry.findById(request.params.id)
  const newEntry = {
    "title":        body.title        ? body.title : origEntry.title,
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