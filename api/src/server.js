const app = require('./app');
const apiPort = 5173 || 4567;

app.listen(apiPort, () => {
  console.log(`Server is running on port ${apiPort}`);
}
);