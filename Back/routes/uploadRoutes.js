import express from "express";
import { addFile } from "../controllers/uploadCn.js";
import { uploadFile } from "../middlewares/uploadFile.js";

const uploadRoutes = express.Router();

uploadRoutes.route('/').post(uploadFile.array('file'),addFile);

export default uploadRoutes;