import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import passport from "passport";

import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();
const app = express();

app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));

app.use(cors());



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
  .then( () => app.listen(PORT, ()=>console.log(`server running on port: ${PORT}`)))
  .catch((error) => console.log("error connecting to the database: ", error.message));

  app.use("/user", userRoutes)
  app.use("/admin", adminRoutes)

