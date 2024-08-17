import catchAsync from "../utils/catchAsync.js";
import Users from "../models/Users.js";
import { mailerSend , emailParams } from "../middlewares/sendEmail.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const createUser = catchAsync(async (req,res,next)=>{
    try{
        const {email,id,password,username,name,role,...others} = req.body;
        const res = await mailerSend.send(emailParams);
        
        // Start Check Email Result
        // **
        // End Of Check Email Result

        const hashPass = bcryptjs.hashSync(password);

        const token = jwt.sign({username,id,role,password:hashPass},process.env.JWT_SECRET);
        
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

export const deleteUser = catchAsync(async(req,res,next)=>{
    try{
        await Users.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: "success",
            message: `User With Id ${req.params.id} Deleted Successfully`,
        });
    }catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message,
        });
    }
});

export const getUser = catchAsync(async(req,res,next)=>{
    try{
        // decode id from token
        const user = await Users.findById(req.id).select('-_v,-password');
        return res.status(200).json({
            status:"success",
            message: "User Founded Successfully",
            data: user
        });
    }catch(err){
        return res.status(400).json({
            status:"failed",
            message: err.message,
        });
    };
});