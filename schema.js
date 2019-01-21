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
}, {toObject: {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v
  }
}});



blogPostSchema.virtual('fullname').get(function() {
  return this.author.firstName + ' ' + this.author.lastName
});

// blogPostSchema.set('toObject', {
//   transform: function (doc, ret, options) {
//     ret.id = ret._id;
//     delete ret._id;
//     delete ret.__v;
//   }
// });

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