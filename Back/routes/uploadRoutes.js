import express from "express";
const uploadRoutes = express.Router();

uploadRoutes.route('/film');
uploadRoutes.route('/series');

export default uploadRoutes;