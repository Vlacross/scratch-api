const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogPostSchema = new schema({
  title: String,
  author: {
    firstName: String,
    lastName: String
  },
  content: String,
  created: Date
});



blogPostSchema.virtual('fullname').get(function() {
  return this.author.firstName + ' ' + this.author.lastName
});

const Post = mongoose.model('post', blogPostSchema);





module.exports = { Post }

/*

  {
      "title": "some title",
      "content": "a bunch of amazing words",
      "author": "Sarah Clarke",1481322758429
      "created": "1481322758429"
  }

*/