const createApp = require('./app');

const app = createApp();

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../client/public", "build", "index.html")
  );
});

app.listen(process.env.SERVER_PORT, () => {
  console.log('  Listen on port ', process.env.SERVER_PORT);
});