/*const PORT = process.env.PORT || 8080;

const DATABASE = 
*/

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://vlacross:password1@ds011439.mlab.com:11439/blog-test';
const PORT = process.env.PORT || 8080 ;

module.exports = {DATABASE_URL, PORT}