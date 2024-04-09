import React from "react";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";

// Define the ImageOverlay component
const ImageOverlay = ({ handleCollection }) => {
  return (
    <div className="p-2 absolute top-0 right-0 w-full h-full flex flex-col justify-between items-end pointer-events-none">
      <div className="flex gap-2">
        <div
          className="clickable-button"
          onClick={(e) => {
            // Prevent the click event from propagating to the image
            e.stopPropagation();
          }}
        >
          <button
            className="clickable-button w-10 h-10 rounded-lg bg-white flex justify-center items-center cursor-default"
            onClick={(e) => {
              e.stopPropagation();
              handleCollection();
            }}
          >
            <BookmarksOutlinedIcon />
          </button>
        </div>
        <button className="w-10 h-10 rounded-lg bg-white flex justify-center items-center">
          <FavoriteBorderOutlinedIcon />
        </button>
      </div>
      <div
        className={`flex items-center justify-center rounded-full w-40 text-white`}
        style={{ backgroundColor: "#048369" }}
      >
        <button className="p-3 flex gap-2 items-center justify-center">
          Download <FileDownloadRoundedIcon />
        </button>
      </div>
    </div>
  );
};

export default ImageOverlay;
