import jwt from "jsonwebtoken";
import HandleError from "../utils/handleError.js";
import catchAsync from "../utils/catchAsync.js";

export const checkAdminOrSuper = catchAsync(async (req, res, next) => {
    const t = req.headers.authorization.split(" ")[1];
    const token = jwt.verify(t, process.env.JWT_SECRET);
    if (!token) {
        next(new HandleError('token is invalid', 401));
    }
    if (token.role === 'admin' || token.role === 'superAdmin') {
        return next();
    } else {
        next(new HandleError('you dont have permission to access this action', 403));
    }
});