import Loader from "../components/Loader";
import React from "react";
import Message from "../components/Message";
import Product from "../components/Product";
import { useGetProductsQuery } from "../redux/slices/productApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message error={isError?.data.message || isError.error} />
      ) : (
        <div className="font-Poppins text-slate-500 lg:px-[7%] px-4">
          <h1 className="font-semibold text-2xl my-4 drop-shadow-[2px_4px_2px_rgba(0,0,0,0.2)]">
            Latest Products
          </h1>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {products?.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
