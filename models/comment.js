const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
  content: String,
  date: Date,
}, {default: undefined})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment