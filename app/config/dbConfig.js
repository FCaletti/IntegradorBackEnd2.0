const dotenv = require('dotenv')
dotenv.config()

module.exports = {
   dbUrl : process.env.MONGODB_URLSTRING,
}