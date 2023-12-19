import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../redux/slices/orderApiSlice";
import { clearCartItems } from "../redux/slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) navigate("/shipping");
    else if (!cart.paymentMethod) navigate("/payment");
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/orders/${res._id}`);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  return (
    <div className="w-full  px-1 md:px-4 lg:px-[7%] font-Poppins mt-24">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="w-full grid lg:grid-cols-3 mt-4 gap-6">
        <div className="lg:col-span-2 ">
          <h1 className="text-slate-400 font-[500] my-2 text-xl  mt-6  mb-1">
            Shipping
          </h1>
          <p className="text-sm text-slate-400">
            <span className="font-medium text-slate-500">Address: </span>
            {cart.shippingAddress.address} , {cart.shippingAddress.city}{" "}
            {cart.shippingAddress.pinCode}, {cart.shippingAddress.country}
          </p>
          <hr className="h-[2px] bg-gray-400 my-4 " />
          <h1 className="text-slate-400 font-[500]  text-xl  mb-1">
            Payment Method
          </h1>
          <p className="text-sm text-slate-400">
            <span className="font-medium text-slate-500">Method: </span>
            {cart.paymentMethod}
          </p>
          <hr className="h-[3px] bg-gray-400 my-4" />
          <h1 className="text-slate-400 font-[500]  text-xl  mb-1">
            Order Items
          </h1>
          <div className=" w-full ">
            {cartItems.length < 1 ? (
              <Message> Your Cart is Empty</Message>
            ) : (
              cartItems.map((item) => (
                <div
                  className="w-full flex p-2 gap-2 items-center md:space-x-5 text-slate-500 font-Poppins border-b-2"
                  key={item._id}
                >
                  <div className="w-[4rem] flex  rounded-md overflow-hidden select-none">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full object-cover rounded-md h-full"
                    />
                  </div>

                  <div className="flex flex-col md:space-x-4 md:flex-row gap-2">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-ellipsis whitespace-nowrap overflow-hidden font-[500] underline select-none text-xs md:w-56"
                    >
                      {item.name}
                    </Link>

                    <p className="text-xs ">
                      {item.qty} x $49.99 = ${item.qty * item.price}
                    </p>
                  </div>
                </div>
              ))
            )}
            {/* //repeat content */}
          </div>
        </div>

        <div className=" p-2">
          <div className="rounded-[0.25rem] shadow-md text-sm text-slate-400 p-2 border">
            <h1 className="text-slate-400 font-[500]  text-xl  mb-1">
              Order Summary
            </h1>
            <hr className="h-[2px] bg-gray-400 my-4" />
            <div className="flex ">
              <span className="w-1/2">items:</span>
              <span>${cart.itemsPrice}</span>
            </div>
            <hr className="h-[2px] bg-gray-400 my-4" />
            <div className="flex ">
              <span className="w-1/2">Shipping:</span>
              <span>${cart.shippingPrice}</span>
            </div>
            <hr className="h-[1.5px] bg-gray-400 my-4" />
            <div className="flex ">
              <span className="w-1/2">Tax:</span>
              <span>${cart.taxPrice}</span>
            </div>
            <hr className="h-[2px] bg-gray-400 my-4" />
            <div className="flex ">
              <span className="w-1/2">Total:</span>
              <span>${cart.totalPrice}</span>
            </div>
            <hr className="h-[1.5px] bg-gray-400 my-4" />
            {isLoading && <Loader />}
            {isError && <Message>{isError}</Message>}
            <button
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0}
              className="bg-slate-700 text-white rounded-md p-2"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
