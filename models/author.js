const mongoose = require('mongoose');
const schema = mongoose.Schema;

const { SCHEMA_OPTS } = require('./common')

const authorSchema = new schema({
    firstName: String,
    lastName: String,
    userName: {type: String,
               unique: true}
  }, SCHEMA_OPTS);
  
  authorSchema.statics.checkExist = function(newId) {
    /*use count() to verify author_id existance within db  */
    
    
    this.count({_id:  newId}, function(err, count) {
        if(count > 0) {
          let msg = `Author exists in db. Found ${count} match`;
          console.log(msg)
          throw (true)
        } else if (count = 0) {
          let msg = `Couldn't find Author_id ${newId}`
          console.log(msg)
          throw (false)
        } else if (err) {
          console.log(err.name)
          throw (err.name)
        }
      })
      
   
    return newId
    
  };
  
  authorSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName
  })

  const Author = mongoose.model('Author', authorSchema);


  module.exports = Author;