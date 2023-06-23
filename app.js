const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// import routes
const indexRoute = require("./app/routes/index");
const adminRoute = require("./app/routes/admin");
const userRoute = require("./app/routes/user");

// middlewares
app.use(express.json());
app.use("/", indexRoute)
app.use("/admin", adminRoute)
app.use("/account", userRoute)

// config
dotenv.config()

// set the view engine to ejs
app.set('view engine', 'ejs');

// serve static files from the "public" directory
app.use(express.static(__dirname + "/public"));

// start the server + mongodb connection
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("server running & db connection succesful")
    });
})
  .catch((err) => {
    console.log(err);
  });
