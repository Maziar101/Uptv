import catchAsync from "../utils/catchAsync.js";
import Users from "../models/Users.js";
import { mailerSend, emailParams } from "../middlewares/sendEmail.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import ApiFeatures from "../utils/apiFeatures.js";

// export const createUser = catchAsync(async (req,res,next)=>{
//     try{
//         const {email,id,password,username,name,role,...others} = req.body;
//         const res = await mailerSend.send(emailParams);

//         // Start Check Email Result
//         // **
//         // End Of Check Email Result

//         const hashPass = bcryptjs.hashSync(password);

//         const token = jwt.sign({username,id,role,password:hashPass},process.env.JWT_SECRET);

//         const user = await Users.create({email,password,username,name,...others});

//         return res.status(201).json({
//             status:"success",
//             message: "User Created Successfully",
//             token,
//         });
//     }catch(err){
//         return res.status(400).json({
//             status: "failed",
//             message: err.message,
//         });
//     };
// });

export const getAllUsers = catchAsync(async (req,res,next)=>{
    try{
        const features = new ApiFeatures(Users,req.query).filters().limitFields().paginate().sort();
        const users = await features.query;
        return res.status(200).json({
            status: 'failed',
            message: 'Users Founded Successfully',
            data: users,
        });
    }catch(err){
        return res.status(400).json({
            status: 'failed',
            message: err.message,
        });
    }
});

export const deleteUser = catchAsync(async (req, res, next) => {
    const { id, role } = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
    if (id === req.params.id || role === 'admin' || role === 'superAdmin') {
        await Users.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: "success",
            message: `User With Id ${req.params.id} Deleted Successfully`,
        });
    } else {
        return res.status(401).json({
            status: "failed",
            message: "You do not have permission to access this action",
        });
    }


});

export const getUser = catchAsync(async (req, res, next) => {
    const {id,role} = jwt.verify(req.headers.authorization.split(" ")[1],process.env.JWT_SECRET);
    if (id === req.params.id || role === 'admin' || role === 'superAdmin'){
        const user = await Users.findById(req.params.id).select('-__v,-password');
        if (user){
            return res.status(200).json({
                status: "success",
                message: `User With Id ${req.params.id} Founded Successfully !`,
                data : user,
            });
        }else{
            return res.status(404).json({
                status: "failed",
                message : `User With Id ${req.params.id} Not Found`,
            });
        }
    }else{
        return res.status(401).json({
            status: "failed",
            message: "You do not have permission to access this action",
        });
    };
});