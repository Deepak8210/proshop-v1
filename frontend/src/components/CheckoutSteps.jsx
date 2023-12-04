import React from "react";
import { Link } from "react-router-dom";
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="w-full lg:px[7%] mt-2 text-xs md:text-[1rem]">
      <div className="w-full flex justify-center gap-4">
        <div className="">
          {step1 ? (
            <Link to={"/login"} className="text-slate-700">
              SignIn
            </Link>
          ) : (
            <Link disabled className="text-slate-400 cursor-default">
              Sign in
            </Link>
          )}
        </div>
        {">"}
        <div>
          {step2 ? (
            <Link to={"/shipping"} className="text-slate-700">
              Shipping
            </Link>
          ) : (
            <Link disabled className="text-slate-400 cursor-default">
              Shipping
            </Link>
          )}
        </div>
        {">"}
        <div>
          {step3 ? (
            <Link to={"/payment"} className="text-slate-700">
              Payments
            </Link>
          ) : (
            <Link disabled className="text-slate-400 cursor-default">
              Payment
            </Link>
          )}
        </div>
        {">"}
        <div>
          {step4 ? (
            <Link to={"/placeorder"} className="text-slate-700">
              Place Order
            </Link>
          ) : (
            <Link disabled className="text-slate-400 cursor-default">
              Place Order
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
