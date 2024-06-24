import express from "express";
const seriesRoutes = express.Router();
seriesRoutes.route("/");
seriesRoutes.route("/:id");
export default seriesRoutes;