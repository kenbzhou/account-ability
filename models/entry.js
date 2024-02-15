const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  title:       {type: String, required: true},
  importance:  {type: Number, required: true},
  date:        {type: String, required: true},
  sched_time:  {type: Number},
  sched_time_r:{type: String},
  description: {type: String},
  url:         {type: String},
  elapsed:     {type: Boolean},
  completed:   {type: Boolean},
})

module.exports = mongoose.model('Entry', entrySchema)
