import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Ratings from "../components/Ratings";
import { useGetProductDetailsQuery } from "../redux/slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(productId);

  return (
    <>
      {" "}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message error={isError?.data.message || isError.error} />
      ) : (
        <div className="w-full min-h-screen lg:px-[10%] px-4 mt-8 font-Poppins">
          <Link
            to={"/"}
            className="bg-slate-200 shadow-md active:scale-95 duration-300 mt-4 text-slate-600 rounded-md py-2 px-4 font-semibold"
          >
            Go Back
          </Link>
          <div className="grid lg:grid-cols-4 gap-8 mt-6 w-full">
            <div className="col-span-2 flex w-full items-start">
              <img
                src={product.image}
                alt=""
                className="object-contain w-full"
              />
            </div>
            <div className="lg:flex col-span-2">
              <div className="  flex flex-col lg:w-1/2">
                <h3 className="text-slate-500 text-xl font-semibold m-2">
                  {product.name}
                </h3>
                <div className="p-2 border-y-2 flex items-center pb-3">
                  <Ratings
                    value={product.rating}
                    text={`${product.numReviews} reviews `}
                  />
                </div>
                <div className="p-2 border-b-2 flex items-center pb-3">
                  <span className="font-semibold text-slate-400">
                    Price: ${product.price}
                  </span>
                </div>
                <div className="p-2 flex items-center pb-3 mt-2">
                  <p className=" text-slate-400 text-sm tracking-wide">
                    Description: {product.description}
                  </p>
                </div>
              </div>
              <div className="  text-slate-400 text-sm lg:w-1/2">
                <div className="border m-2 p-2 rounded-md">
                  <div className=" flex py-2 space-x-12">
                    <span>Price:</span>
                    <span className="font-semibold ">${product.price}</span>
                  </div>
                  <div className="border-y-2 py-2 flex space-x-[2.3rem]">
                    <span>Status:</span>
                    <span>
                      {" "}
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </span>
                  </div>
                  {product.countInStock > 0 ? (
                    <div className="border-b-2 py-2 flex space-x-14">
                      <span>Qty:</span>
                      <input
                        className="border py-2 rounded-md px-4 outline-none w-full"
                        min={1}
                        type="number"
                        max={product.countInStock}
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  <div className=" my-4 mt-6">
                    <button
                      onClick={() => dispatch(addToCart({ ...product, qty }))}
                      className="bg-slate-600 shadow-lg active:scale-95 duration-300 text-slate-200 py-2 rounded-md px-4"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
