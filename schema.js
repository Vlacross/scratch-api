const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogPostSchema = new schema({
  title: String,
  author: {
    firstName: String,
    lastName: String
  },
  content: String,
  created: String
});



blogPostSchema.virtual('fullname').get(function() {
  return this.author.firstName + ' ' + this.author.lastName
});

const post = mongoose.model('post', blogPostSchema);





module.exports = {post}

/*

  {
      "title": "some title",
      "content": "a bunch of amazing words",
      "author": "Sarah Clarke",
      "created": "1481322758429"
  }

*/