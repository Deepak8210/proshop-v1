import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../redux/slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [pinCode, setPinCode] = useState(shippingAddress?.pincode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, pinCode, country }));
    navigate("/payment");
  };
  return (
    <div className="w-full  px-4 lg:px-[7%] font-Poppins mt-24">
      <CheckoutSteps step1 step2 />
      <h1 className="text-slate-400 font-[500] my-2 text-2xl lg:w-[70%] lg:mx-auto mt-6">
        Shipping Address
      </h1>
      <form onSubmit={SubmitHandler} className="w-full lg:w-[70%] lg:mx-auto">
        <h6 className="text-slate-500 ml-1">Address</h6>{" "}
        <div className="w-full border rounded-[0.5rem] flex items-center p-2 mt-1">
          <input
            value={address}
            name="address"
            type="text"
            placeholder="enter address"
            className="   w-full outline-none text-slate-500 "
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <h6 className="text-slate-500 ml-1">City</h6>{" "}
        <div className="w-full border rounded-[0.5rem] flex items-center p-2 mt-1">
          <input
            value={city}
            name="address"
            type="text"
            placeholder="enter address"
            className="   w-full outline-none text-slate-500 "
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <h6 className="text-slate-500 ml-1">PinCode</h6>{" "}
        <div className="w-full border rounded-[0.5rem] flex items-center p-2 mt-1">
          <input
            value={pinCode}
            name="address"
            type="text"
            placeholder="enter pincode"
            className="   w-full outline-none text-slate-500 "
            onChange={(e) => setPinCode(e.target.value)}
          />
        </div>
        <h6 className="text-slate-500 ml-1">Country</h6>{" "}
        <div className="w-full border rounded-[0.5rem] flex items-center p-2 mt-1">
          <input
            value={country}
            name="address"
            type="text"
            placeholder="enter address"
            className="   w-full outline-none text-slate-500 "
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button
          // disabled={isLoading}
          type="submit"
          className="py-2 px-4 rounded-md bg-slate-700 text-white my-4 w-full shadow-md active:scale-95 duration-100"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ShippingScreen;
