import React from "react";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

// Define the ImageOverlay component
const ImageOverlay = ({ image, handleCollection }) => (
  <div className="absolute top-0 left-0 w-full h-full flex justify-end items-start pointer-events-none">
    <div className="flex gap-2">
      <div
        className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
          handleCollection();
        }}
      >
        <BookmarksOutlinedIcon />
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center">
        <FavoriteBorderOutlinedIcon />
      </div>
    </div>
  </div>
);

export default ImageOverlay;
