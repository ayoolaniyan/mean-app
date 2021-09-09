const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
mongoose.connect('mongodb+srv://eweb:' +
    process.env.MONGO_ATLAS_PW +
    '@cluster0-uzcql.mongodb.net/node-angular?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed');
    });
// mongoose
//   .connect(
//     "mongodb://bridgewhizz:" +
//     process.env.MONGO_ATLAS_PW +
//     "@cluster0-shard-00-00-x8tcg.mongodb.net:27017,cluster0-shard-00-01-x8tcg.mongodb.net:27017,cluster0-shard-00-02-x8tcg.mongodb.net:27017/node-angular?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority&useUnifiedTopology: true&useNewUrlParser: true"
//   )
//   .then(() => {
//     console.log("Connected to the database!");
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
