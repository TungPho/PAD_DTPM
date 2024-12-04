const app = require("./src/app");
const db = require("./src/dbs/connect");

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
