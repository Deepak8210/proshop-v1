import React from "react";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../../redux/slices/productApiSlice";
import { Link } from "react-router-dom";

const ProductListScreen = () => {
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const deleteHandler = (id) => {
    console.log(id);
  };
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="w-full lg:px-[7%] px-2">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-slate-400 font-[500] my-2 text-3xl  mt-6">
          Orders
        </h1>
        <button
          className="flex items-center text-white py-2 px-3 rounded-[0.2rem] bg-slate-700 md:my-0 my-2 active:scale-95 duration-200 shadow-md"
          onClick={createProductHandler}
        >
          <FaEdit className="mr-1" />
          Create Product
        </button>
      </div>
      {loadingCreate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="bg-red-200 text-red-500 border rounded-[0.3rem]">
          {isError?.data?.message || isError.error}
        </div>
      ) : (
        <>
          <div className="md:block hidden">
            <table className="w-full text-sm text-slate-600">
              <thead>
                <tr>
                  <th className="">ID</th>
                  <th className="">NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    className="text-center border-y-2 hover:bg-slate-200"
                    key={product._id}
                  >
                    <td className="">{product._id}</td>
                    <td className="">{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td className="flex">
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className="mr-2 bg-slate-500 p-1 rounded-[0.2rem] text-gray-200"
                      >
                        <FaEdit />
                      </Link>
                      <Link
                        onClick={() => deleteHandler(product._id)}
                        className=" p-1 rounded-[0.2rem] bg-red-600 text-white"
                      >
                        <FaTrash />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.map((product) => (
            <div
              className="md:hidden border rounded-[0.2rem] text-sm p-1 my-1"
              key={product._id}
            >
              <div className="w-full  flex">
                <h6 className="w-[30%] font-semibold text-slate-500">ID</h6>
                <p className="w-[70%]">{product._id}</p>
              </div>
              <div className="w-full  flex">
                <h6 className="w-[30%] font-semibold text-slate-500">NAME</h6>
                <p className="w-[70%]"> ${product.price}</p>
              </div>
              <div className="w-full  flex">
                <h6 className="w-[30%] font-semibold text-slate-500">PRICE</h6>
                <p className="w-[70%]"> {product.price}</p>
              </div>
              <div className="w-full  flex">
                <h6 className="w-[30%] font-semibold text-slate-500">
                  CATEGORY
                </h6>
                <p className="w-[70%]"> {product.category}</p>
              </div>
              <div className="w-full  flex">
                <h6 className="w-[30%] font-semibold text-slate-500">BRAND</h6>
                <p className="w-[70%]">{product.brand}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/admin/product/${product._id}/edit`}
                  className="bg-slate-700 text-white p-1 flex items-center rounded-[0.2rem] my-1  active:scale-95 duration-200 shadow-md"
                >
                  <FaEdit />
                </Link>
                <Link
                  onClick={() => deleteHandler(product._id)}
                  className="bg-red-600 text-white p-1 flex items-center rounded-[0.2rem] my-1  active:scale-95 duration-200 shadow-md"
                >
                  <FaTrash />
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
