import express from "express"
import { createFilm, deleteFilm, getAllFilm, getFilm, updateFilm } from "../controllers/filmCn.js";
import { checkAdminOrSuper } from "../middlewares/checkAdminOrSuper.js";

const filmRoutes = express.Router();
filmRoutes.route('/').get(getAllFilm).post(checkAdminOrSuper,createFilm);
filmRoutes.route('/:id').get(getFilm).patch(checkAdminOrSuper,updateFilm).delete(checkAdminOrSuper,deleteFilm);
export default filmRoutes