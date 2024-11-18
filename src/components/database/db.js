const { createPool } = require("mysql2/promise");
// const dotenv = require("dotenv");

// dotenv.config();
let pool = null;

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
};

const connectToDatabase = async () => {
  try {
    if (!pool) {
      pool = createPool(dbConfig);
    }
    return pool;
  } catch (error) {
    throw new Error(`connecting to MySQL: ${error}`);
  }
};

// const releaseConnection = async () => {
//   if (pool) {
//     // pool.end();
//   }
// };

module.exports = { connectToDatabase };
