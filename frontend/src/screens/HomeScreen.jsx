import Loader from "../components/Loader";
import React from "react";
import Message from "../components/Message";
import Product from "../components/Product";
import {
  useGetProductsQuery,
  useGetTopProductsQuery,
} from "../redux/slices/productApiSlice";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCrousel from "../components/ProductCrousel";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message error={isError?.data?.message || isError.error} />
      ) : (
        <div className="font-Poppins text-slate-500 lg:px-[7%] px-4 mt-24">
          {!keyword ? (
            <ProductCrousel />
          ) : (
            <Link
              to={"/"}
              className="p-2 bg-slate-700 text-white rounded-[0.2rem]"
            >
              Go Back
            </Link>
          )}
          <h1 className="font-semibold text-2xl my-4 drop-shadow-[2px_4px_2px_rgba(0,0,0,0.2)]">
            Latest Products
          </h1>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {data.products?.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
          <Paginate
            currentPage={data.page}
            totalPages={data.pages}
            keyword={keyword ? keyword : ""}
          />
        </div>
      )}
    </>
  );
};

export default HomeScreen;
