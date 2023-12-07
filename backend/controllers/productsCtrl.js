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

//create a product POST api/products private/admin
const createProductCtrl = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/image/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//update a product PUT/api/products/:id private/admin
const updateProductCtrl = asyncHandler(async (req, res) => {
  const { name, price, image, description, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.description = description;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {
  productsCtrl,
  singleProductCtrl,
  createProductCtrl,
  updateProductCtrl,
};
