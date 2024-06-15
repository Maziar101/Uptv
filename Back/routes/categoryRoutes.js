import express from "express"
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../controllers/categoryCn.js";

const categoryRoutes = express.Router();

categoryRoutes.route('/').post(createCategory).get(getAllCategory);
categoryRoutes.route('/:id').patch(updateCategory).delete(deleteCategory);

export default categoryRoutes;