const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = schema.Types.ObjectId;

const { SCHEMA_OPTS } = require('./common')
const {Author} = require('./author')



const blogPostSchema = new schema({
  title: String,
  author: {type: ObjectId, ref: 'Author'},        
  content: String,
  created: {type: Date, default: Date.now},
  comments: [{type: ObjectId, ref: 'Comment'}]
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

function populateAuthor() {
    console.log('this');
    console.log('twiggered')
}

blogPostSchema.pre('find', populateAuthor)
// blogPostSchema.pre('findOne', populateAuthor)

blogPostSchema.pre('validate', function() {
    console.log(this, 33)
})

blogPostSchema.virtual('authrah').get(function() {
    
  return this.author.firstName + ' ' + this.author.lastName
});


const Post = mongoose.model('Post', blogPostSchema);

module.exports = Post;