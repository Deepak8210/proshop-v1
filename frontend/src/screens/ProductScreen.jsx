import { useState } from "react";
import { useParams, Link, useNavigate, Form } from "react-router-dom";
import Ratings from "../components/Ratings";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../redux/slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";

import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    refetch,
    isError,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      setRating(0);
      setComment("");
    }
  };

  return (
    <>
      {" "}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message error={isError?.data.message || isError.error} />
      ) : (
        <div className="w-full min-h-screen lg:px-[10%] px-4  font-Poppins mt-24">
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
            <div className=" w-full col-span-2">
              <h2 className="font-semibold text-xl text-slate-500">Reviews</h2>
              {product.reviews.length === 0 && (
                <div className="bg-blue-200 border-blue-200 border p-2 rounded-[0.2rem] mt-1">
                  <h3 className="text-blue-400">No reviews</h3>
                </div>
              )}
              <div>
                {product.reviews.map((review) => (
                  <div key={review._id}>
                    <strong>{review.name}</strong>
                    <Ratings value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 ">
                <h2 className="font-[500] text-xl text-slate-400 bg-slate-200 p-1 rounded-[0.2rem] mt-4">
                  Write a Customer Review
                </h2>
                {loadingProductReview && <Loader />}
                {userInfo ? (
                  <div>
                    <form
                      onSubmit={onSubmitHandler}
                      method="post"
                      className="flex flex-col"
                    >
                      <label htmlFor="rating" className=" text-slate-400 mt-2">
                        Rating
                      </label>
                      <select
                        className="border outline-none rounded-[0.2rem]  p-1"
                        name="rating"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                      <label htmlFor="comment" className=" text-slate-400 mt-2">
                        Comment
                      </label>
                      <textarea
                        className="border outline-none rounded-[0.2rem] p-1 text-sm"
                        name="comment"
                        id="comment"
                        cols="30"
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <button
                        disabled={loadingProductReview}
                        type="submit"
                        className="p-2 bg-slate-700 text-white mt-2 rounded-[0.2rem] active:scale-95 duration-200 shadow-md"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="bg-blue-200 border-blue-200 border p-2 rounded-[0.2rem] mt-1">
                    <h3 className="text-blue-400">
                      Please{" "}
                      <Link to={"/login"} className="text-purple-700 underline">
                        sign in
                      </Link>{" "}
                      to write a review{" "}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
