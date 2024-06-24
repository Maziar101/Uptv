import express from "express";

const usersRoutes = express.Router();
usersRoutes.route("/");
usersRoutes.route("/update-profile");
export default usersRoutes;