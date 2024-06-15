import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import HandleError from "./utils/handleError.js";
import catchError from "./utils/catchError.js";
import categoryRoutes from "./routes/categoryRoutes.js";

// Config Base Of Project

const app = express();
dotenv.config({path:'./config.env'});
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/api/v1/category",categoryRoutes);
app.use("*",(req,res,next)=>{
    next(new HandleError("api route not found",404));
});
app.use(catchError);




export default app;