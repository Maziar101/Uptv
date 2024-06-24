import express from "express";

const authRoutes = express.Router();
authRoutes.route("/");
authRoutes.route("/register");
export default authRoutes;