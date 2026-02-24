const app = require('./app');
const { PORT } = require('./config/env');
const { connectDb } = require('./config/db');

async function start() {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
