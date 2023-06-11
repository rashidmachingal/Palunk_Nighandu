const express = require("express");
const app = express();
const { PORT } = require("./config");
// import routes
const indexRoute = require("./app/routes/index");

// middlewares
app.use("/", indexRoute)

// serve static files from the "public" directory
app.use(express.static(__dirname + "/public"));

// start the server
app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});
