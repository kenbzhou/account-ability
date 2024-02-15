const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  title:       {type: String, required: true},
  user:        {type: String, required: true},
  importance:  {type: Number, required: true},
  date:        {type: String, required: true},
  sched_time:  {type: Number},
  sched_time_r:{type: String},
  description: {type: String},
  url:         {type: String},
  elapsed:     {type: Boolean,required: true,default: false},
  completed:   {type: Boolean,required: true,default: false},
})

  // recurring:
  // deadline:
  //

module.exports = mongoose.model('Entry', entrySchema)
