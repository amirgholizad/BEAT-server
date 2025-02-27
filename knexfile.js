// Import dotenv to process environment variables from `.env` file.
import "dotenv/config";

export default {
  client: "mysql2",
  connection: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "utf8",
  },
};
