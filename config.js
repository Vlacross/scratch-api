/*const PORT = process.env.PORT || 8080;

const DATABASE = 
*/

exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://localhost/bookapp'; 