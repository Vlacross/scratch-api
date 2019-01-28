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

// function populateAuthor() {
//   console.log('twiggeredOne')
//   console.log()
//     console.log('twiggeredTwo')
// }

// blogPostSchema.pre('find', populateAuthor)
// blogPostSchema.pre('findOne', populateAuthor(err, doc))

blogPostSchema.pre('validate', function() {
    console.log(this.author, 'valley')
    Author.checkExist(this.author)
});

blogPostSchema.post('validate', function() {
  console.log('post-Val')
})

blogPostSchema.pre('save', function() {
  console.log('pre-save')
});

blogPostSchema.post('save', function() {
  console.log(this, 'post-save')
})

blogPostSchema.virtual('authrah').get(function() {
    
if(this === undefined)  {
    console.log('names are undeffed')
    
} else console.log('not undeffed');    
  return this.author.firstName + ' ' + this.author.lastName
});


const Post = mongoose.model('Post', blogPostSchema);

module.exports = Post;