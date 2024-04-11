import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

const DownloadArea = ({ image }) => {
  const [tick, setTick] = useState("original"); //setting the button
  const [hover, setHover] = useState(null);
  const [imgLink, setImgLink] = useState("");

  const handleclick = () => {
    if (tick === "original") {
      setImgLink(image.urls.regular);
    } else if (tick === "medium") {
      setImgLink(image.urls.small);
    } else {
      setImgLink(image.urls.thumb);
    }

    // Check if the download link is a webpage
    if (imgLink.endsWith(".jpg") || imgLink.endsWith(".png")) {
      // If it's a direct link to an image file, proceed with the download
      const link = document.createElement("a");
      link.href = imgLink;
      link.setAttribute("download", ""); // Set the download attribute to force download
      document.body.appendChild(link);

      // Trigger the click event on the link
      link.click();

      // Remove the link from the DOM
      document.body.removeChild(link);
    } else {
      // If it's a webpage, alert the user or handle the situation accordingly
      alert("Unable to download image. Please try again later.");
    }
  };

  return (
    <div className="absolute top-16 right-0 font-Tilt-Neon box-border">
      <div className="min-w-72 rounded-md min-h-20 bg-white shadow-md shadow-slate-300 text-black flex flex-col">
        <p className="text-xl p-3">Choose a Size:</p>
        <ul className="flex flex-col">
          <li
            onClick={() => setTick("original")}
            onMouseEnter={() => setHover("original")}
            onMouseLeave={() => setHover(null)}
            className={`flex justify-between items-center px-3 py-2 cursor-pointer ${
              hover === "original" ? "bg-gray-100" : ""
            }`}
          >
            <span className="text-gray-400 flex gap-2">
              <b className="text-black">Original</b> 1080 pixels
            </span>
            {tick === "original" && (
              <DoneAllOutlinedIcon sx={{ color: "blue" }} />
            )}
          </li>
          <li
            onClick={() => setTick("medium")}
            onMouseEnter={() => setHover("medium")}
            onMouseLeave={() => setHover(null)}
            className={`flex justify-between items-center px-3 py-2 cursor-pointer ${
              hover === "medium" ? "bg-gray-100" : ""
            }`}
          >
            <span className="text-gray-400 flex gap-2">
              <b className="text-black">Medium</b> 400 pixels
            </span>
            {tick === "medium" && (
              <DoneAllOutlinedIcon sx={{ color: "blue" }} />
            )}
          </li>
          <li
            onClick={() => setTick("small")}
            onMouseEnter={() => setHover("small")}
            onMouseLeave={() => setHover(null)}
            className={`flex justify-between items-center px-3 py-2 cursor-pointer ${
              hover === "small" ? "bg-gray-100" : ""
            }`}
          >
            <span className="text-gray-400 flex gap-2">
              <b className="text-black">Small</b> 200 pixels
            </span>
            {tick === "small" && <DoneAllOutlinedIcon sx={{ color: "blue" }} />}
          </li>
        </ul>
        <button
          type="submit"
          className="m-3 p-3 rounded-md text-white mt-10 self-center cursor-pointer"
          style={{ backgroundColor: "#048369" }}
          // onClick={handleclick}
        >
          Download Selected Size
        </button>
      </div>
    </div>
  );
};

export default DownloadArea;
