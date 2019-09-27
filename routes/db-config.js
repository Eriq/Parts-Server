const { Pool, Client } = require('pg');
const connectionString = 'postgresql://postgres:123@localhost:5432/parts';

const client = new Client({
  connectionString: connectionString
});

module.exports = client;