import express from "express"
import { createCategory, deleteCategory, deleteSubCategory, getAllCategory, updateCategory } from "../controllers/categoryCn.js";

const categoryRoutes = express.Router();

categoryRoutes.route('/').post(createCategory).get(getAllCategory);
categoryRoutes.route('/:id').delete(deleteCategory);
categoryRoutes.route('/update-sub/:catid/:subid').patch(updateCategory);
categoryRoutes.route('/delete-sub/:catid/:subid').delete(deleteSubCategory);

export default categoryRoutes;