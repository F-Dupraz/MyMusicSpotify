const createApp = require('./app');

const app = createApp();

app.listen(process.env.SERVER_PORT, () => {
  console.log('  Listen on port ', process.env.SERVER_PORT);
});