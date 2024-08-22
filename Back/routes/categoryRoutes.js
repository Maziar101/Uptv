import express from "express"
import { createCategory, deleteCategory, deleteSubCategory, getAllCategory, updateCategory } from "../controllers/categoryCn.js";
import { checkAdminOrSuper } from "../middlewares/checkAdminOrSuper.js";

const categoryRoutes = express.Router();

categoryRoutes.route('/').post(checkAdminOrSuper,createCategory).get(getAllCategory);
categoryRoutes.route('/:id').delete(checkAdminOrSuper,deleteCategory);
categoryRoutes.route('/update-sub/:catid/:subid').patch(checkAdminOrSuper,updateCategory);
categoryRoutes.route('/delete-sub/:catid/:subid').delete(checkAdminOrSuper,deleteSubCategory);

export default categoryRoutes;