import catchAsync from "../utils/catchAsync.js";
import Users from "../models/Users.js";
import { mailerSend , emailParams } from "../middlewares/sendEmail.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const createUser = catchAsync(async (req,res,next)=>{
    try{
        const {email,password,username,name,...others} = req.body;
        const res = await mailerSend.send(emailParams);
        
        // Start Check Email Result
        // **
        // End Of Check Email Result

        const hashPass = bcryptjs.hashSync(password);

        const token = jwt.sign({username,password:hashPass,name},process.env.JWT_SECRET);
        
        const user = await Users.create({email,password,username,name,...others});

        return res.status(201).json({
            status:"success",
            message: "User Created Successfully",
            token,
        });
    }catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message,
        });
    };
});