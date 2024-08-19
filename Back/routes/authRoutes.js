import express from "express";
import { login , register} from "../controllers/authCn.js";

const authRoutes = express.Router();
authRoutes.route("/").post(login);
authRoutes.route("/register").post(register);
export default authRoutes;