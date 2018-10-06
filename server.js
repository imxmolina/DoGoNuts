require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes/api/apiRoutes");
const PORT = process.env.PORT || 3001;
const app = express();
var bodyParser = require("body-parser");
var auth = require("./routes/api/auth");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);
app.use("/api/auth", auth);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/donutDB",
  {
    useMongoClient: true
  }
);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});