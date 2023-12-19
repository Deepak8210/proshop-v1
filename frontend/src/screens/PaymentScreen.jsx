import React, { useState, useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../redux/slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress) navigate("/shipping");
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(paymentMethod);
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="w-full  px-4 lg:px-[7%] font-Poppins mt-24">
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-slate-400 font-[500] my-2 text-2xl lg:w-[70%] lg:mx-auto mt-6  mb-2">
        Payment Method
      </h1>
      <div className="lg:w-[70%] lg:mx-auto mt-6">
        <h4>Select Method</h4>
        <form onSubmit={submitHandler} className="flex flex-col space-x-4 mt-2">
          <div className="flex gap-2 px-4">
            <input
              type="radio"
              id="paypal"
              value={"PayPal"}
              checked
              name="paymentMethod"
              className="form-radio text-blue-500"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal" className="cursor-pointer text-sm">
              Paypal
            </label>

            <input
              type="radio"
              id="creditCard"
              value={"CreditCard"}
              name="paymentMethod"
              className="form-radio text-blue-500"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="creditCard" className="cursor-pointer text-sm">
              Credit Card
            </label>
          </div>

          <button
            type="submit"
            className="bg-slate-700 rounded-md py-2 px-4 w-fit text-white text-sm mt-4 border "
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
