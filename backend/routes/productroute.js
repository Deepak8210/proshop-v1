import express from "express";
import {
  productsCtrl,
  singleProductCtrl,
  createProductCtrl,
  updateProductCtrl,
} from "../controllers/productsCtrl.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const productRoute = express.Router();

productRoute
  .route("/")
  .get(productsCtrl)
  .post(protect, admin, createProductCtrl);
productRoute
  .route("/:id")
  .get(singleProductCtrl)
  .put(protect, admin, updateProductCtrl);

export default productRoute;
