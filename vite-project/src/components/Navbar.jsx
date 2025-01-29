import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/slices/SearchSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { setIsAuthenticated } from "../redux/slices/AuthSlice"; // Assuming you have an AuthSlice with setIsAuthenticated action

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      dispatch(setIsAuthenticated(false)); // Dispatch action to update authentication state
      window.location.href = "/Login"; // Redirect after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="flex flex-col lg:flex-row justify-between py-3 mx-6 mb-10">
      <div>
        <h3 className="text-xl font-bold text-gray-600">
          {new Date().toUTCString().slice(0, 16)}
        </h3>
        <h1 className="text-2xl font-bold "> Jaypee Foods</h1>
      </div>
      <div>
        <input
          type="search"
          name="search"
          id=""
          placeholder="Search here"
          autoComplete="off"
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="p-3 border border-gray-400 text-sm rounded-lg outline-none w-full lg:w-[25vw]"
        />
      </div>
      {isAuthenticated ? (
        <div>
          <h1 className="text-2xl text-red-600">Welcome to Jaypee Foods</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <Link to="/Signup">Signup</Link>
          <Link to="/Login">Login</Link>
         <Link to="https://api.whatsapp.com/send/?phone=%2B917055922888&text&type=phone_number&app_absent=0"> <img className="h-8" src="https://w7.pngwing.com/pngs/132/965/png-transparent-whatsapp-email-web-design-message-icon-whatsapp-whatsapp-logo-text-logo-grass-thumbnail.png" alt="" /></Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
