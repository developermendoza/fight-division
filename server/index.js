import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import passport from "passport";

import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";
import fightersRoutes from "./routes/fighters.js";
import matchesRoutes from "./routes/matches.js";
import eventsRoutes from "./routes/events.js";
import networksRoutes from "./routes/networks.js";
import organizationsRoutes from "./routes/organizations.js";
import sportsRoutes from "./routes/sports.js";
import weightsRoutes from "./routes/weights.js";
import matchOutcomeMethodsRoutes from "./routes/matchOutcomeMethods.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
// const __dirname = path.resolve();

dotenv.config();
const app = express();

app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));

app.use(cors());

app.use(express.json());

// console.log("process.env.NODE_ENV: ", process.env.NODE_ENV)

// console.log("__dirname: ", __dirname)
// Serve static assets if in production
if(process.env.NODE_ENV === "production"){
  // app.use(express.static('client/build'));

  res.sendFile(path.join(__dirname, "client", "build"), function(err) {
    if (err) {
       res.status(500).send(err)
    }
 })
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
  .then( () => app.listen(PORT, ()=>console.log(`server running on port: ${PORT}`)))
  .catch((error) => console.log("error connecting to the database: ", error.message));


  app.use("/users", userRoutes)
  app.use("/admin", adminRoutes)
  app.use("/weights", weightsRoutes)
  app.use("/organizations", organizationsRoutes)
  app.use("/sports", sportsRoutes)
  app.use("/networks", networksRoutes)
  app.use("/fighters", fightersRoutes)
  app.use("/matches", matchesRoutes)
  app.use("/events", eventsRoutes)
  app.use("/matchOutcomeMethods", matchOutcomeMethodsRoutes)
 

