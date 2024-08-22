import jwt from "jsonwebtoken";

export const isLogin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const validatedToken = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({
            status: 'failed',
            message: 'token is invalid',
        });
    }
}