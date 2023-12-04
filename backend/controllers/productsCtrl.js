import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const productsCtrl = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) return res.json(products);
  else {
    res.status(404);
    throw new Error("Products not found");
  }
});

const singleProductCtrl = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);
  else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { productsCtrl, singleProductCtrl };
