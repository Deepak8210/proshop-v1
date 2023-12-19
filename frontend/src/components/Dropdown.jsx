// Assuming 'navigate', 'logoutHandler', and other necessary functions are defined.
import { useState, useEffect } from "react";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { useLogoutMutation } from "../redux/slices/usersApiSlice";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Dropdown = ({ userInfo }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isAdminVisible, setAdminVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the dropdown if the click is outside of the dropdown area
      if (
        isDropdownVisible &&
        !event.target.closest(".dropdown") // Replace 'dropdown' with the appropriate class
      ) {
        setDropdownVisible(false);
      }

      // Close the admin dropdown if the click is outside of the admin dropdown area
      if (
        isAdminVisible &&
        !event.target.closest(".admin-dropdown") // Replace 'admin-dropdown' with the appropriate class
      ) {
        setAdminVisible(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownVisible, isAdminVisible]);

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
    <div className="flex ml-6 gap-2">
      {/* User Dropdown */}
      {userInfo ? (
        <div className="relative flex items-center dropdown">
          <button
            htmlFor="userDropdown"
            className="text-white mr-1 flex items-center"
            onClick={() => setDropdownVisible(!isDropdownVisible)}
          >
            {userInfo.name}{" "}
            <FaCaretDown id="userDropdown" className="text-white" />
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
                onClick={logoutHandler}
                className="cursor-pointer hover:bg-slate-200 px-3 text-sm"
              >
                Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          to={"/login"}
          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center gap-2"
        >
          <FaUser />
          Sign
        </Link>
      )}

      {/* Admin Dropdown */}
      {userInfo && userInfo.isAdmin && (
        <div className="relative flex items-center admin-dropdown">
          <button
            onClick={() => setAdminVisible(!isAdminVisible)}
            htmlFor="adminDropdown"
            className="text-white mr-1 flex items-center"
          >
            Admin <FaCaretDown id="adminDropdown" className="text-white" />
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
      )}
    </div>
  );
};

export default Dropdown;
