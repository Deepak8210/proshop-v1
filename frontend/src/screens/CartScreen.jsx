import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
} from "../redux/slices/cartSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      {" "}
      {cartItems.length < 1 ? (
        <div className="w-full min-h-[calc(100vh-5rem)] flex items-center flex-col justify-center gap-2 font-Poppins mt-24">
          <h1 className="text-2xl font-semibold  text-slate-400">
            Your Cart is Empty!
          </h1>
          <button
            onClick={() => navigate("/")}
            className="rounded-md bg-slate-700 text-white px-4 py-2"
          >
            Go Back
          </button>
        </div>
      ) : (
        <div className="w-full min-h-screen lg:px-[7%] md:px-4 mt-24 ">
          <h1 className="text-[1.5rem] font-semibold font-Poppins text-slate-500 my-2 px-4">
            Shopping Cart
          </h1>
          <div className="w-full h-full flex flex-col md:flex-row">
            {/* //left side */}
            <div className="lg:w-3/4 md:w-[62%] w-full ">
              {/* //repeat content */}
              {cartItems.map((item) => (
                <div
                  className="w-full flex p-2 gap-2 items-center text-slate-500 font-Poppins border-b-2 h-24"
                  key={item._id}
                >
                  <div className="w-[6rem] flex h-full rounded-md overflow-hidden select-none">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full object-cover rounded-md h-full"
                    />
                  </div>
                  <div className=" flex flex-col gap-1 w-full truncate justify-center">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-ellipsis whitespace-nowrap overflow-hidden font-[500] underline select-none"
                    >
                      {item.name}
                    </Link>
                    <div className="w-full flex items-center space-x-4">
                      <h4 className="w-20 font-semibold text-slate-600 select-none">
                        ${item.price}
                      </h4>
                      <div className="flex items-center gap-2">
                        <div
                          onClick={() =>
                            dispatch(decrementQty({ _id: item._id }))
                          }
                          className="border rounded-md active:bg-slate-500 active:text-white shadow-sm"
                        >
                          <AiOutlineMinus />
                        </div>
                        <span className="flex w-16 justify-center select-none">
                          {item.qty}
                        </span>
                        <div
                          onClick={() =>
                            dispatch(incrementQty({ _id: item._id }))
                          }
                          className="border rounded-md active:bg-slate-500 active:text-white shadow-sm"
                        >
                          <AiOutlinePlus />
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          dispatch(removeFromCart({ _id: item._id }))
                        }
                        className="p-2 border bg-gray-200 rounded-md"
                      >
                        <FaTrash className="text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className=" w-full md:w-[38%] lg:w-1/3 px-4">
              <div className="w-full border rounded-md flex flex-col space-y-4 p-2 pb-6">
                <h2 className="text-2xl font-[500] font-Poppins text-slate-400 select-none">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                <h6 className="font-semibold text-slate-500 select-none">
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h6>
                <button
                  disabled={cartItems.length < 1}
                  onClick={checkoutHandler}
                  className="bg-slate-700 rounded-md px-4 py-2 text-white font-Poppins font-[500] active:scale-95 duration-100 shadow-md"
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartScreen;
