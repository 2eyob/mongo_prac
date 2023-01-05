const express = require("express");
const app = express();
app.use(express.json());
const apiVersion = "/api/v1";
//import userRoute from "./routes/users";

//Routes
//app.use(`${apiVersion}/`, userRoute);

module.exports = { app };
