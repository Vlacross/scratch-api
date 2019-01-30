const mongoose = require('mongoose');
const schema = mongoose.Schema;

const { SCHEMA_OPTS } = require('./common')

const authorSchema = new schema({
    firstName: String,
    lastName: String,
    userName: {type: String,
               unique: true}
  }, SCHEMA_OPTS);
  
  

authorSchema.pre('save', function() {
  Author.checkExist(this.userName, 'userName')
})
authorSchema.post('save', function() {
  console.log('pre-auth', this, 'authorsaver')
})


authorSchema.methods.serialize = function() {
  return {
    _id: this._id,
    name: this.fullName,
    userName: this.userName
  }
}


/*
*Check for existence in Author collection
* @param {String} param - Unique value being used to search for author
* @param {String} type - Schema property  */
  authorSchema.statics.checkExist = function(param, type) {
    /*use count() to verify author_id existance within db  */
    
    var query = {};
    query[type] = param;

    return this.count(query, function(err, count) {
      
        if(count > 0) {
          let msg = `Author exists in db. Found ${count} match`;
          console.log(msg)
          return param
        }
        if (count = 0) {
          let msg = `Couldn't find Author_id ${newId}`
          console.log(msg)
          return new Error(msg);
        }
        if(err) {
          console.log(err.name)
          return new Error(err.name)
        }

        return param
    })
      
  };
  
  authorSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName
  })

  const Author = mongoose.model('Author', authorSchema);


  module.exports = Author; 