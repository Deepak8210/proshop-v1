import React from "react";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../redux/slices/orderApiSlice";
import { Link } from "react-router-dom";

const OrderListScreen = () => {
  const { data: orders, isLoading, isError } = useGetOrdersQuery();

  return (
    <div className="w-full lg:px-[7%] px-2 mt-24">
      <h1 className="text-slate-400 font-[500] my-2 text-3xl  mt-6">Orders</h1>
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
                  <th className="">USER</th>
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
                    <td className="">{order?.user.name}</td>
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
                      {order.isDelivered ? (
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
                <h6 className="w-[30%] font-semibold text-slate-500">USER</h6>
                <p className="w-[70%]">{order?.user.name}</p>
              </div>
              <div className="w-full  flex">
                <h6 className="w-[30%] font-semibold text-slate-500">DATE</h6>
                <p className="w-[70%]">{order.createdAt.substring(0, 10)}</p>
              </div>
              <div className="w-full  flex">
                <h6 className="w-[30%] font-semibold text-slate-500">TOTAL</h6>
                <p className="w-[70%]">${order.totalPrice}</p>
              </div>
              <div className="w-full  flex">
                <h6 className="w-[30%] font-semibold text-slate-500">PAID</h6>
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
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes className="text-center text-red-600" />
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
  );
};

export default OrderListScreen;
