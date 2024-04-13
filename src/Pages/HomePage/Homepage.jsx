import React, { useEffect } from "react";
import UnsplashImages from "../../Components/Home/UnsplashImages";
import Navbar from "../../Components/Common/Navbar";

const Homepage = () => {
  useEffect(() => {
    document.title = "Splash";
  });
  return (
    <div className="bg-sky-950" style={{ minHeight: "100vh" }}>
      <Navbar />
      <UnsplashImages />
    </div>
  );
};

export default Homepage;
