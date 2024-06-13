import mongoose from "mongoose";
import app from "./app.js";

const Port = process.env.PORT || 5000;

app.listen(Port,()=>{
    console.log(`Server is Running on Port ${Port}`);
});

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("DataBase Connected Seccessfully ...");
}).catch((err)=>{
    console.log(err);
});