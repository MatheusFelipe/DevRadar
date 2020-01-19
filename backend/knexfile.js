const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;

const config = {
  client: 'pg',
  connection: { user, password, host, port, database },
  pool: {
    afterCreate(connection, callback) {
      connection.query("SET TIME ZONE 'UTC'", err => {
        callback(err, connection);
      });
    },
  },
};

module.exports = config;
