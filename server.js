require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started!");
  console.log("Listening on PORT ", port);
});
