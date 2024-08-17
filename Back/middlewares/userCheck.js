import jwt from "jsonwebtoken";

export const userCheck = (req,res,next)=>{
    const {id,role} = jwt.verify(req.headers.authorization.split(" ")[0],process.env.JWT_SECRET);
    if (req.params.id === id && role === 'user' || role === 'admin' || role === 'superAdmin'){
        next();
    }else{
        return res.status(400).json({
            status:"failed",
            message:"You do not have permission to access this action",
        });
    }
};