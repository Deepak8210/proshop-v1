import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../redux/slices/productApiSlice";
import Ratings from "./Ratings";

const ProductCrousel = () => {
  const { data: products, isLoading, isError } = useGetTopProductsQuery({});
  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message>{isError}</Message>
  ) : (
    <div>
      <h1 className="font-semibold text-2xl my-4 drop-shadow-[2px_4px_2px_rgba(0,0,0,0.2)]">
        Best Selling Products
      </h1>
      <Splide
        aria-label="My Favorite Images"
        options={{
          autoplay: true,
          rewind: true,
        }}
      >
        {products.map((product) => (
          <SplideSlide key={product._id}>
            <Link to={`/product/${product._id}`}>
              <div className="bg-slate-700 relative md:flex">
                <img src={product.image} alt={product.name} />
                <div className="w-full display  flex flex-col items-center justify-center p-2">
                  <h2 className="text-center text-slate-400 w-full font-semibold text-2xl mt-4">
                    {product.name}
                  </h2>
                  <Ratings
                    value={product.rating}
                    text={`${product.numReviews} reviews `}
                  />
                  <div className="p-2  flex items-center pb-3">
                    <span className="font-semibold text-slate-400">
                      Price: ${product.price}
                    </span>
                  </div>
                  <div className="p-2 flex items-center pb-3 mt-2 lg:w-3/4">
                    <p className=" text-slate-400 text-sm tracking-wide">
                      <strong>Description:</strong> {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>{" "}
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default ProductCrousel;
