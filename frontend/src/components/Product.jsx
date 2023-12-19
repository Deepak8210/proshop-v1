import React from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";

const Product = ({ product }) => {
  return (
    <div className="border shadow-md rounded-md flex flex-col p-4">
      <Link to={`/product/${product._id}`} className="flex ">
        <img
          src={product.image}
          alt=""
          className=" object-contain rounded-t-[5px]"
        />
      </Link>
      <Link
        to={`/product/${product._id}`}
        className="text-sm font-semibold text-slate-600 mt-3 "
      >
        <h3 className="underline text-ellipsis whitespace-nowrap overflow-hidden">
          {product.name}
        </h3>
      </Link>
      <div>
        <Ratings
          value={product.rating}
          text={`${product.numReviews} reviews`}
        />
      </div>
      <h3 className="font-semibold text-xl">${product.price}</h3>
    </div>
  );
};

export default Product;
