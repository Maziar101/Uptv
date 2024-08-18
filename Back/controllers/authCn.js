import Users from "../models/Users";
import catchAsync from "../utils/catchAsync";
import HandleError from "../utils/handleError";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = catchAsync(async (req,res,next)=>{
    const {username,password} = req.body;
    if (!username || !password){
        new HandleError('Please Provide Username And Password',400);
    };
    const user = await Users.findOne({username});
    if (!user){
        new HandleError('Username Or Password Is Incorrect',400);
    };
    const validatedPass = bcryptjs.compareSync(password,user.password);
    if (!validatedPass){
        new HandleError('Username Or Password Is Incorrect',400);
    };
    const token = jwt.sign({id: user._id,role:user.role},process.env.JWT_SECRET);
    const {password:hashPass,...otherUser} = user;
    return res.status(200).json({
        status:"success",
        message:"Login Successfully",
        data: otherUser,
        token,
        name: user.name,
        role: user.role,
    });
});

export const register = catchAsync(async (req,res,next)=>{
    const {password,...others} = req.body;
    const hashPass = bcryptjs.hashSync(password);
    await Users.create({...others,password:hashPass});
    return res.status(201).json({
        status:"success",
        message:"Register Successfully",
    });
});