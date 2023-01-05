//import app from "./app";
// const app = require("./app");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const { connect } = require("./config/db");
const userRoute = require("./routes/user");
const apiVersion = "/api/v1";
//Routes

app.use(`${apiVersion}/`, userRoute);

// Connect To Database
connect()
  .then()
  .catch((e) => console.log(e));

app.listen(PORT, () =>
  console.log(`server ready at: http://localhost:${PORT}`)
);
