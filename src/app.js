import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { sequelize } from "../models";

// imported routes for our app
import homeRoute from "./routes/homeRoute";
import tasksRoute from "./routes/tasksRoute";
import userRoute from "./routes/userRoute";
// configure dotenv
dotenv.config();

// initialize express app
const app = express();

app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token"
  );
  next();
});

// bodyParser
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: "true" }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// use routes
app.use(homeRoute);
app.use(tasksRoute);
app.use(userRoute);

// Port and hostname
const port = process.env.PORT || 5000;
const hostname = process.env.HOST_NAME;

// app listening to requests setup
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/..`);
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

// eslint-disable-next-line import/prefer-default-export
export { app };
