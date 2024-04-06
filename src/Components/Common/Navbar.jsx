import React from "react";
import "tailwindcss/tailwind.css";

const Navbar = () => {
  return (
    <nav className="flex justify-center font-Tilt-Neon px-3">
      <div className="max-w-7xl w-full flex justify-between items-center">
        <div className="w-44">
          <img
            src={`${process.env.PUBLIC_URL}/Asset/Logo/splash.png`}
            alt="Logo"
            className="w-full"
          />
        </div>
        <ul className="text-white text-xl">
          <li>Collections</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
