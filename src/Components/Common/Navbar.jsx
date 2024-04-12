import React from "react";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-center font-Tilt-Neon px-3">
      <div className="max-w-7xl w-full flex justify-between items-center pt-5">
        <div
          className="w-28 sm:w-44 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={`${process.env.PUBLIC_URL}/Asset/Logo/splash.png`}
            alt="Logo"
            className="w-full"
          />
        </div>
        <ul className="text-white text-xl">
          <li
            className="cursor-pointer"
            onClick={() => navigate("/collections")}
          >
            Collections
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
