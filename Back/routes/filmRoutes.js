import express from "express"
import { createFilm, deleteFilm, getAllFilm, getFilm, updateFilm } from "../controllers/filmCn.js";

const filmRoutes = express.Router();
filmRoutes.route('/').get(getAllFilm).post(createFilm);
filmRoutes.route('/:id').get(getFilm).patch(updateFilm).delete(deleteFilm);
export default filmRoutes