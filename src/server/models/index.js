var mongoose = require('mongoose')
// entidades:
let VoteSchema = new mongoose.Schema({
  showId: { type: Number, required: true, unique: true },
  count: { type: Number, default: 0 }
})
// registrar esquema en mongo
module.exports = mongoose.model('Vote', VoteSchema)
