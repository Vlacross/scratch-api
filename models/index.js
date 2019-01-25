const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const ObjectId = mongoose.Schema.Types.ObjectId;


module.exports = {
  Author: require('./author'),
  Comment: require('./comment'),
  Post: require('./blogPost')
}