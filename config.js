/*const PORT = process.env.PORT || 8080;

const DATABASE = 
*/

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/blopo';
const PORT = process.env.PORT || 8080 ;

module.exports = {DATABASE_URL, PORT}