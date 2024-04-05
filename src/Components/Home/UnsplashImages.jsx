import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

const UnsplashImages = () => {
  const [images, setImages] = useState([]); //setting an updating the api array of images
  const [pageNumber, setPageNumber] = useState(1); //setting and updating pages when click event
  const [totalNumber, setTotalNumber] = useState(); //setting and updating total pages in api based on search
  const [input, setInput] = useState(""); //updating input value
  const [blurActive, setBlurActive] = useState(false); //setting blur when onclick
  const [searchActive, setSearchActive] = useState(false); //searchbar active status
  const [maxImage, setMaxImage] = useState(""); //showing images of onclicked image in max view
  const [arrowActive, setArrowActive] = useState(false); //arrow setting dropdown menu

  //fetching api for images
  useEffect(() => {
    const fetchImages = async (page = pageNumber, perPage = 21) => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos/?client_id=oCWdYYvYZwAIRfOW7O9pBKpPKVsaPpayb8VEqYolSQU&page=${page}&per_page=${perPage}&query=${input}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        console.log(data);
        setImages(data.results);
        setTotalNumber(data.total_pages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [pageNumber, input]);

  //for prev click
  const prevClick = () => {
    const total = totalNumber + 1;
    let prev = 0;
    if (pageNumber - 1 <= 0) {
      console.log("n");
    } else {
      prev = (pageNumber - 1 + total) % total;
      console.log(prev);
      setPageNumber(prev);
    }
  };

  //for next click
  const nextClick = () => {
    const total = totalNumber + 1;
    let next = 0;
    if (pageNumber + 1 >= totalNumber + 1) {
      console.log("y");
    } else {
      next = (pageNumber + 1) % total;
      console.log(next);
      setPageNumber(next);
    }
  };

  const imageClick = (image) => {
    setBlurActive(true);
    setMaxImage(image);
  };

  return (
    <div
      className="flex flex-col items-center justify-center font-Tilt-Neon"
      style={{ minHeight: "100vh" }}
      onClick={() => setSearchActive(false)}
    >
      <form className="max-w-7xl w-full my-3 relative">
        <input
          className="w-full p-3 outline-none border-2 border-blue-400 rounded-full bg-sky-950 px-7 text-white"
          type="text"
          value={input}
          onChange={(e) => {
            setSearchActive(true);
            setInput(e.target.value);
          }}
        />
        {searchActive && (
          <SearchIcon
            className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white"
            fontSize="large"
          />
        )}
      </form>
      <div className="max-w-7xl w-full flex gap-5 justify-center flex-wrap cursor-pointer">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            onClick={() => imageClick(image)}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={prevClick}>Prev</button>
        <button onClick={nextClick}>Next</button>
      </div>
      {blurActive && (
        <div
          className="w-full h-full fixed top-0 right-0 z-10 py-5 flex justify-center"
          style={{ backgroundColor: "rgba(109, 107, 107, 0.219)" }}
          onClick={() => setBlurActive(false)}
        >
          <div className="bg-white max-w-5xl w-full rounded-xl h-full p-3 flex justify-between">
            <div className="">
              <img
                src={maxImage.urls.small}
                alt=""
                className="rounded-lg max-h-[85vh]"
              />
            </div>
            <div>
              <div
                className="flex items-center justify-between rounded-md w-52 text-white"
                style={{ backgroundColor: "#05A081" }}
              >
                <p className="p-3">Free Download</p>
                <hr className="w-[1px] h-8 bg-black text-black" />
                <div className="p-3" onClick={() => setArrowActive(true)}>
                  <KeyboardArrowDownIcon
                    className={`${arrowActive ? "rotate-180" : " "}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnsplashImages;
