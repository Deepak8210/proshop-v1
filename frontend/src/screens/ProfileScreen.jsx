import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useProfileMutation } from "../redux/slices/usersApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { useGetMyOrdersQuery } from "../redux/slices/orderApiSlice";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, isError } = useGetMyOrdersQuery();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password not Matched");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="w-full  px-2 lg:px-[7%] font-Poppins text-slate-400 mt-24">
      <div className="w-full grid lg:grid-cols-3 mt-4 gap-6">
        <div className=" p-2">
          <h1 className="text-slate-400 font-[500] my-2 text-2xl  mt-6">
            User Profile
          </h1>
          <form
            onSubmit={submitHandler}
            className=" rounded-[0.3rem] flex flex-col text-sm gap-1"
          >
            <label htmlFor="name" className="mt-2 text-slate-500">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              className="border rounded-[0.25rem] py-2 px-2 outline-none"
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email" className="mt-2 text-slate-500">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              className="border rounded-[0.25rem] py-2 px-2 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="mt-2 text-slate-500">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              className="border rounded-[0.25rem] py-2 px-2 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirmPassword" className="mt-2 text-slate-500">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              className="border rounded-[0.25rem] py-2 px-2 outline-none"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="text-white bg-slate-700 rounded-[0.2rem] p-2 lg:w-fit mt-2 active:scale-95 duration-200 shadow-md"
            >
              Update
            </button>
          </form>
        </div>
        <div className="lg:col-span-2 ">
          <h1 className="text-slate-400 font-[500] my-2 text-2xl  mt-6">
            My orders
          </h1>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div className="bg-red-200 text-red-500 border rounded-[0.3rem]">
              {isError?.data?.message || isError.error}
            </div>
          ) : (
            <>
              <div className="md:block hidden">
                <table className="w-full text-sm text-slate-600">
                  <thead>
                    <tr>
                      <th className="">ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        className="text-center border-y-2 hover:bg-slate-200"
                        key={order._id}
                      >
                        <td className="">{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <FaTimes className="text-center text-red-600 w-full h-6 p-1" />
                          )}
                        </td>
                        <td>
                          {order.isDeliverd ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <FaTimes className="text-center text-red-600 w-full h-6 p-1" />
                          )}
                        </td>
                        <td>
                          <Link
                            to={`/orders/${order._id}`}
                            className="bg-slate-700 text-white px-2 rounded-[0.2rem] my-1  active:scale-95 duration-200 shadow-md"
                          >
                            details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {orders.map((order) => (
                <div
                  className="md:hidden border rounded-[0.2rem] text-sm p-1 my-1"
                  key={order._id}
                >
                  <div className="w-full  flex">
                    <h6 className="w-[30%] font-semibold text-slate-500">ID</h6>
                    <p className="w-[70%]">{order._id}</p>
                  </div>
                  <div className="w-full  flex">
                    <h6 className="w-[30%] font-semibold text-slate-500">
                      DATE
                    </h6>
                    <p className="w-[70%]">
                      {order.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <div className="w-full  flex">
                    <h6 className="w-[30%] font-semibold text-slate-500">
                      TOTAL
                    </h6>
                    <p className="w-[70%]">${order.totalPrice}</p>
                  </div>
                  <div className="w-full  flex">
                    <h6 className="w-[30%] font-semibold text-slate-500">
                      PAID
                    </h6>
                    <p className="w-[70%]">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes className="text-center text-red-600 " />
                      )}
                    </p>
                  </div>
                  <div className="w-full  flex">
                    <h6 className="w-[30%] font-semibold text-slate-500">
                      DELIVERED
                    </h6>
                    <p className="w-[70%]">
                      {" "}
                      {order.isDeliverd ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes className="text-center text-red-600 " />
                      )}
                    </p>
                  </div>
                  <Link
                    to={`/orders/${order._id}`}
                    className="bg-slate-700 text-white px-2 rounded-[0.2rem] my-1  active:scale-95 duration-200 shadow-md"
                  >
                    details
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
