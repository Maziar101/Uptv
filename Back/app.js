import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import HandleError from "./utils/handleError.js";
import catchError from "./utils/catchError.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import filmRoutes from "./routes/filmRoutes.js";
import seriesRoutes from "./routes/seriesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Config Base Of Project

const app = express();
dotenv.config({path:'./config.env'});
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static('public'));
app.use(cors());

// Routes
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/films",filmRoutes);
app.use("/api/v1/series",seriesRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/users",usersRoutes);
app.use("/api/v1/upload",uploadRoutes);
app.use("*",(req,res,next)=>{
    next(new HandleError("api route not found",404));
});
app.use(catchError);

export default app;