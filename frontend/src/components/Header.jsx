import React, { useState } from "react";
import brandImg from "/brand.png";
import { FaShoppingCart, FaUser, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/slices/usersApiSlice";
import { logout } from "../redux/slices/authSlice";
const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
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
              <div className="flex flex-shrink-0 items-center">
                <img className="h-8 w-auto" src={brandImg} alt="ProShop" />
                <span className="text-lg text-white font-semibold">
                  ProShop
                </span>
              </div>
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
                      <h6 className="text-white mr-1">{userInfo.name}</h6>
                      <FaChevronDown
                        className="text-white"
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                      />
                      {isDropdownVisible && (
                        <div className="absolute border-2 rounded-md top-10 right-0 bg-white z-50">
                          <div
                            onClick={() => navigate("/profile")}
                            className="cursor-pointer hover:bg-slate-200 px-1"
                          >
                            Profile
                          </div>
                          <div
                            className="cursor-pointer hover:bg-slate-200 px-1"
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
