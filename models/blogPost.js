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
// blogPostSchema.plugin(require('mongoose-autopopulate'))

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
  // this.populate('author');

}

blogPostSchema.pre('find', populateAuthor)
blogPostSchema.pre('findOne', populateAuthor)

blogPostSchema.post('save', function() {
  this.populate('author')
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