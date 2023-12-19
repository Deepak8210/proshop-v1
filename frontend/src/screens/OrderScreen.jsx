import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from "../redux/slices/orderApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    isError: errorPaypal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPaypal && !loadingPayPal && paypal.clientID) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal.clientID,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPaypal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Success");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment Success");
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered");
      console.log();
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message />
  ) : (
    <div className="w-full  px-4 lg:px-[7%] font-Poppins mt-24">
      <h1 className="text-slate-400 md:text-2xl text-xl font-[500] mt-4">
        Order {order._id}
      </h1>
      <div className="w-full grid lg:grid-cols-3 mt-4 gap-6">
        <div className="lg:col-span-2 text-sm text-slate-400">
          <h1 className="text-slate-400 font-[500] my-2 text-xl  mt-6  mb-1">
            Shipping
          </h1>
          <p>
            <span className="font-[500] text-slate-500">Name: </span>
            {order.user.name}
          </p>
          <p>
            <span className="font-[500] text-slate-500">Email: </span>
            {order.user.email}
          </p>
          <p>
            <span className="font-[500] text-slate-500"> Address: </span>{" "}
            {order.shippingAddress.address} , {order.shippingAddress.city}{" "}
            {order.shippingAddress.pinCode}, {order.shippingAddress.country}
          </p>
          {order.isDelivered ? (
            <div className="border py-2 px-3 rounded-[0.3rem] mt-2 bg-green-200 text-green-500">
              Delivered on {order.deliveredAt}
            </div>
          ) : (
            <div className="border py-2 px-3 rounded-[0.3rem] mt-2 bg-red-200 text-red-500">
              not delivered
            </div>
          )}
          <hr className="h-[2px] bg-gray-400 my-4 " />
          <h1 className="text-slate-400 font-[500]  text-xl  mb-1">
            Payment Method
          </h1>
          <p className="text-sm text-slate-400">
            <span className="font-medium text-slate-500">Method: </span>
            {order.paymentMethod}
          </p>
          {order.isPaid ? (
            <div className="border py-2 px-3 rounded-[0.3rem] mt-2 bg-green-200 text-green-500">
              Paid on {order.paidAt}
            </div>
          ) : (
            <div className="border py-2 px-3 rounded-[0.3rem] mt-2 bg-red-200 text-red-500">
              not Paid
            </div>
          )}
          <hr className="h-[3px] bg-gray-400 my-4" />

          <h1 className="text-slate-400 font-[500]  text-xl  mb-1">
            Order Items
          </h1>
          <div className=" w-full ">
            {order.orderItems.map((item) => (
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
            ))}
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
              <span>${order.itemsPrice}</span>
            </div>
            <hr className="h-[1.5px] bg-gray-400 my-4" />
            <div className="flex ">
              <span className="w-1/2">Shipping:</span>
              <span>${order.shippingPrice}</span>
            </div>
            <hr className="h-[2px] bg-gray-400 my-4" />
            <div className="flex ">
              <span className="w-1/2">Tax:</span>
              <span>${order.taxPrice}</span>
            </div>
            <hr className="h-[1.5px] bg-gray-400 my-4" />
            <div className="flex ">
              <span className="w-1/2">Total:</span>
              <span>${order.totalPrice}</span>
            </div>
            <hr className="h-[1.5px] bg-gray-400 my-4" />
            {!order.isPaid && (
              <div className="w-full h-40">
                {loadingPay && <Loader />}
                {isPending ? (
                  <Loader />
                ) : (
                  <div>
                    {/* <button
                      onClick={onApproveTest}
                      className="bg-slate-700 text-white rounded-[0.3rem] p-2 mb-2"
                    >
                      Test Pay Order
                    </button> */}
                    <div className="mb-2">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  </div>
                )}
              </div>
            )}

            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <div className="mb-2">
                  <button
                    onClick={deliverOrderHandler}
                    className="bg-slate-700 text-white rounded-[0.3rem] p-2 mb-2 active:scale-95 duration-200 shadow-md"
                  >
                    Mark as Delivered
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
