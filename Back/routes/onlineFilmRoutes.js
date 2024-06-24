import express from "express";

const onlineFilmRoutes = express.Router();
onlineFilmRoutes.route('/:videoId').get();

export default onlineFilmRoutes;