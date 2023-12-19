import React, { useRef, useState } from "react";
import brandImg from "/brand.png";
import { FaShoppingCart, FaUser, FaCaretDown, FaSearch } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  menuHandler,
  menuBarCloseHandler,
  searchCloseHandler,
  searchHandler,
} from "../utils/menuShow";
import Dropdown from "./Dropdown";

const Header = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const { userInfo } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
    searchCloseHandler(searchRef);
    setKeyword("");
  };

  const menuRef = useRef();
  const menuBar = useRef();
  const closeRef = useRef();
  const searchRef = useRef();

  return (
    <header className="w-full bg-slate-500 h-20 flex justify-between item-center md:px-[7%] px-4 items-center fixed left-0 top-0 z-[1000] border-b-2 border-yellowFlash">
      <nav className="flex flex-1 items-center justify-between">
        <Link to={"/"} className="flex flex-shrink-0 items-center">
          <img className="h-8 w-auto" src={brandImg} alt="ProShop" />
          <span className="text-lg text-white font-semibold">ProShop</span>
        </Link>
        <div className="flex space-x-4">
          <button
            onClick={() => searchHandler(menuRef, searchRef)}
            className=" cursor-pointer  text-white  flex items-center justify-center hover:text-black"
          >
            <FaSearch className="text-xl" />
          </button>
          <Link
            to="/cart"
            className=" text-white group rounded-md relative text-sm font-medium flex items-center gap-2"
            aria-current="page"
          >
            <FaShoppingCart className="text-xl group-hover:text-slate-900" />
            <div className="bg-green-500 w-6 h-4 flex items-center justify-center rounded-full p-2 absolute -top-2 -right-4">
              <span className="text-sm">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            </div>
          </Link>
          <div
            ref={menuRef}
            className="text-black lg:border-none border-b-2 border-yellowFlash duration-500 w-1/2 lg:w-1/2 lg:flex grid grid-cols-3 lg:flex-row lg:static  items-center md:justify-center gap-4 absolute top-[101%] -right-[100%] bg-gray-600 lg:bg-transparent font-oswald uppercase tracking-widest"
          >
            <Dropdown userInfo={userInfo} />
          </div>
          <div
            className="lg:hidden duration-200"
            onClick={() => menuHandler(menuRef, menuBar, closeRef)}
            ref={menuBar}
          >
            <HiMenuAlt3 id="menu" className="hover:text-yellowFlash text-3xl" />
          </div>

          <div
            className="hidden lg:hidden"
            onClick={() => menuBarCloseHandler(menuRef, menuBar, closeRef)}
            ref={closeRef}
          >
            <IoMdClose className="text-3xl" />
          </div>
          <form
            onSubmit={onSubmitHandler}
            className="duration-200 absolute top-[110%] right-0 origin-top lg:w-fit w-full px-2 h-fit flex  justify-end items-center scale-y-0"
            ref={searchRef}
          >
            <input
              type="text"
              name="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="search here..."
              id="search-box"
              className=" shadow-md p-2 lg:w-[30rem] w-full  rounded-l-sm outline-none h-fit text-gray-500"
            />
            <button
              type="submit"
              className=" shadow-md w-fit h-fit bg-white text-black p-2 rounded-r-sm"
            >
              <FaSearch className="text-2xl text-slate-400 p-1 hover:text-red-600" />
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
