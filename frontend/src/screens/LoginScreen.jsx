import React, { useState, useEffect } from "react";
import { MdEmail, MdKey } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useLoginMutation } from "../redux/slices/usersApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="w-full  px-4 lg:px-[7%] font-Poppins mt-24">
      <h1 className="text-slate-400 font-[500] my-2 text-2xl lg:w-[70%] lg:mx-auto mt-6">
        Sign In
      </h1>
      <form onSubmit={SubmitHandler} className="w-full lg:w-[70%] lg:mx-auto">
        <h6 className="text-slate-500">Email Address</h6>{" "}
        <div className="w-full border rounded-[0.5rem] flex items-center p-2">
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            className="   w-full outline-none text-slate-500 "
            onChange={(e) => setEmail(e.target.value)}
          />
          <MdEmail className="text-xl text-slate-400" />
        </div>
        <h6 className="text-slate-500 mt-2">Password</h6>{" "}
        <div className="w-full border rounded-[0.5rem] flex items-center p-2">
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            className="   w-full outline-none text-slate-500 "
            onChange={(e) => setPassword(e.target.value)}
          />
          <MdKey className="text-xl text-slate-400" />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="py-2 px-4 rounded-md bg-slate-700 text-white my-4 w-full shadow-md active:scale-95 duration-100"
        >
          Sign In
        </button>
        {isLoading && <Loader />}
        <h6 className="text-sm text-slate-400">
          New Customer?
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            className="text-slate-600 underline ml-1"
          >
            Register
          </Link>
        </h6>
      </form>
    </div>
  );
};

export default LoginScreen;
