import express from "express";
import { addFile } from "../controllers/uploadCn.js";
import { uploadFile } from "../middlewares/uploadFile.js";
import { isLogin } from "../middlewares/isLogin.js";

const uploadRoutes = express.Router();

uploadRoutes.route('/').post(isLogin,uploadFile.array('file'),addFile);

export default uploadRoutes;