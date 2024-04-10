import React, { useState } from "react";

const ImageWithHoverButtons = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Prevent event bubbling from image click to the container's onClick
    // event.stopPropagation();
    console.log("Image clicked (optional logic here)");
  };

  const handleButton1Click = () => {
    console.log("Button 1 clicked");
  };

  const handleButton2Click = () => {
    console.log("Button 2 clicked");
  };

  const handleButton3Click = () => {
    console.log("Button 3 clicked");
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="image-container relative w-96 h-72 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src="https://www.littlethings.info/wp-content/uploads/2014/04/dummy-image-green-e1398449160839.jpg"
        alt="Description"
        className="main-image w-full h-auto"
        onClick={handleClick}
      />
      {isHovered && (
        <button
          className="button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent border-none text-white px-4 py-2 cursor-pointer transition-opacity duration-200 ease-in-out z-10"
          onClick={handleButton1Click}
        >
          Button 1
        </button>
      )}
      {isHovered && (
        <button
          className="button absolute top-20 left-20 bg-transparent border-none text-white px-4 py-2 cursor-pointer z-10"
          onClick={handleButton2Click}
        >
          Button 2
        </button>
      )}
      {isHovered && (
        <button
          className="button absolute bottom-20 right-20 bg-transparent border-none text-white px-4 py-2 cursor-pointer z-10"
          onClick={handleButton3Click}
        >
          Button 3
        </button>
      )}
    </div>
  );
};

export default ImageWithHoverButtons;
