import express from "express";
import {
  productsCtrl,
  singleProductCtrl,
} from "../controllers/productsCtrl.js";

const productRoute = express.Router();

productRoute.get("/", productsCtrl);
productRoute.get("/:id", singleProductCtrl);

export default productRoute;
