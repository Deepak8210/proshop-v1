import React, { useState } from "react";
import brandImg from "/brand.png";
import { FaShoppingCart, FaUser, FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/slices/usersApiSlice";
import { logout } from "../redux/slices/authSlice";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isAdminVisible, setAdminVisible] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setDropdownVisible(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-Poppins">
      <nav className="bg-slate-500">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-between">
              <Link to={"/"} className="flex flex-shrink-0 items-center">
                <img className="h-8 w-auto" src={brandImg} alt="ProShop" />
                <span className="text-lg text-white font-semibold">
                  ProShop
                </span>
              </Link>
              <div className=" sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/cart"
                    className=" text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium flex items-center gap-2"
                    aria-current="page"
                  >
                    <FaShoppingCart /> Cart
                    <div className="bg-green-500 w-6 h-4 flex items-center justify-center rounded-full p-2">
                      <span className="text-sm">
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </span>
                    </div>
                  </Link>
                  {userInfo ? (
                    <div className=" relative flex items-center">
                      <button
                        htmlFor="drop"
                        className="text-white mr-1 flex items-center"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                      >
                        {userInfo.name}{" "}
                        <FaCaretDown id="drop" className="text-white" />
                      </button>

                      {isDropdownVisible && (
                        <div className="absolute border-2 rounded-[0.2rem] top-10 right-0 bg-white z-50">
                          <div
                            onClick={() => {
                              navigate("/profile");
                              setDropdownVisible(false);
                            }}
                            className="cursor-pointer hover:bg-slate-200 px-3 text-sm"
                          >
                            Profile
                          </div>
                          <hr />
                          <div
                            className="cursor-pointer hover:bg-slate-200 px-3 text-sm"
                            onClick={logoutHandler}
                          >
                            Logout
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center gap-2"
                    >
                      <FaUser />
                      Sign In
                    </Link>
                  )}

                  {userInfo && userInfo.isAdmin ? (
                    <div className=" relative flex items-center">
                      <button
                        onClick={() => setAdminVisible(!isAdminVisible)}
                        htmlFor="drop"
                        className="text-white mr-1 flex items-center"
                      >
                        Admin
                        <FaCaretDown id="drop" className="text-white" />
                      </button>

                      {isAdminVisible && (
                        <div className="absolute border-2 rounded-[0.2rem] top-10 right-0 bg-white z-50">
                          <div
                            onClick={() => {
                              navigate("/admin/productlist");
                              setAdminVisible(false);
                            }}
                            className="cursor-pointer hover:bg-slate-200 px-3 text-sm"
                          >
                            Products
                          </div>
                          <hr />
                          <div
                            onClick={() => {
                              navigate("/admin/orderlist");
                              setAdminVisible(false);
                            }}
                            className="cursor-pointer hover:bg-slate-200 px-3 text-sm"
                          >
                            Users
                          </div>
                          <hr />
                          <div
                            onClick={() => {
                              navigate("/admin/orderlist");
                              setAdminVisible(false);
                            }}
                            className="cursor-pointer hover:bg-slate-200 px-3 text-sm"
                          >
                            Orders
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
