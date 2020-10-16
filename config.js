require('dotenv').config();

console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV !== 'production');

module.exports = {
  PORT: 3000,
  DB_ADDRESS: (process.env.NODE_ENV !== 'production') ? 'mongodb://localhost:27017/newsdb' : process.env.DB_ADDRESS,
  JWT_SECRET: (process.env.NODE_ENV !== 'production') ? 'JWT_SECRET' : process.env.JWT_SECRET,
};
