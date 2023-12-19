import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../redux/slices/productApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };
    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated");
      navigate("/admin/productlist");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      console.log(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="w-full lg:px-[7%] px-2 pt-4 mt-24">
      <Link
        to={"/admin/productlist"}
        className="bg-slate-300 text-slate-700 rounded-[0.2rem] py-2 px-3"
      >
        Go Back
      </Link>
      <h1 className="text-slate-400 font-[500] my-2 text-2xl lg:w-[70%] lg:mx-auto mt-6">
        Edit Product
      </h1>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message>{isError}</Message>
      ) : (
        <form
          onSubmit={submitHandler}
          className="w-full lg:w-[70%] lg:mx-auto flex flex-col gap-1 text-sm font-semibold text-slate-400"
        >
          <label className="mt-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="enter product name"
            name="name"
            className="p-2 border rounded-[0.2rem] outline-none"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="mt-1" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            placeholder="enter product price"
            name="price"
            className="p-2 border rounded-[0.2rem] outline-none"
            onChange={(e) => setPrice(e.target.value)}
          />
          {/* here goes label for image */}
          <label className="mt-1" htmlFor="brand">
            Image
          </label>
          <input
            type="text"
            placeholder="enter image url"
            value={image}
            className="p-2 border rounded-[0.2rem] outline-none"
            onChange={(e) => setImage}
          />
          <input
            type="file"
            placeholder="choose file"
            className="p-2 border rounded-[0.2rem] outline-none"
            onChange={uploadFileHandler}
          />
          <label className="mt-1" htmlFor="brand">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            value={brand}
            placeholder="enter product brand"
            name="brand"
            className="p-2 border rounded-[0.2rem] outline-none"
            onChange={(e) => setBrand(e.target.value)}
          />

          <label className="mt-1" htmlFor="count-in-stock">
            Count In Stock
          </label>

          <input
            type="number"
            id="count-in-stock"
            value={countInStock}
            placeholder="enter product stock count"
            name="countInStock"
            className="p-2 border rounded-[0.2rem] outline-none"
            onChange={(e) => setCountInStock(e.target.value)}
          />

          <label className="mt-1" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            placeholder="enter product category"
            name="category"
            className="p-2 border rounded-[0.2rem] outline-none"
            onChange={(e) => setCategory(e.target.value)}
          />
          <label className="mt-1" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            placeholder="enter product description"
            name="description"
            className="p-2 border rounded-[0.2rem] outline-none"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="px-3 py-2 rounded-[0.2rem] text-white bg-slate-700 mt-2 w-full lg:w-fit"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductEditScreen;
