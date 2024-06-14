import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import HandleError from "./utils/handleError.js";
import catchError from "./utils/catchError.js";

// Config Base Of Project

const app = express();
dotenv.config({path:'./config.env'});
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes

app.use("*",(req,res,next)=>{
    next(new HandleError("api route not found",404));
});
app.use(catchError);




export default app;