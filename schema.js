const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = schema.Types.ObjectId;
mongoose.set('useCreateIndex', true)




const SCHEMA_OPTS = {
  toObject: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    }
  }
}



const commentSchema = new schema({
  content: String,
  date: Date,
}, {default: undefined})







const blogPostSchema = new schema({
  title: String,
  author: {type: ObjectId, ref: 'Author'},        
  content: String,
  created: {type: Date, default: Date.now},
  comments: [commentSchema]
}, SCHEMA_OPTS);

blogPostSchema.methods.serialize = function() {
  return {
    title: this.title,
    author: this.authrah,
    content: this.content,
    created: this.created,
    comments: this.comments
  }
}

blogPostSchema.virtual('authrah').get(function() {
  return this.author.firstName + ' ' + this.author.lastName
});

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



const Comment = mongoose.model('Comment', commentSchema);
const Post = mongoose.model('Post', blogPostSchema);
const Author = mongoose.model('Author', authorSchema)




module.exports = { Post, Author, Comment }

/*

  {
      "title": "some title",
      "content": "a bunch of amazing words",
      "author": "Sarah Clarke",1481322758429
      "created": "1481322758429"
  }

*/