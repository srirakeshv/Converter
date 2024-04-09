import React, { useState, useEffect, lazy, Suspense } from "react";
import "tailwindcss/tailwind.css";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ImageOverlay from "./ImageOverlay"; //hover image component
import gsap from "gsap";
import "../Home/Css/UnsplashImage.css";
import Skeleton from "@mui/material/Skeleton";

const LazyImage = lazy(() => import("./LazyImage"));

const UnsplashImages = () => {
  const [images, setImages] = useState([]); //setting an updating the api array of images
  const [pageNumber, setPageNumber] = useState(1); //setting and updating pages when click event
  const [totalNumber, setTotalNumber] = useState(); //setting and updating total pages in api based on search
  const [input, setInput] = useState(""); //updating input value
  const [blurActive, setBlurActive] = useState(false); //setting blur when onclick
  const [searchActive, setSearchActive] = useState(false); //searchbar active status
  const [maxImage, setMaxImage] = useState(""); //showing images of onclicked image in max view
  const [arrowActive, setArrowActive] = useState(false); //arrow setting dropdown menu
  const [hover, setHover] = useState(null); //setting hover status for images
  const [zoom, setZoom] = useState(false); //setting zoom images
  const [isLoading, setIsLoading] = useState(true); //setting skeleton before image load

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

  //imageclick
  const imageClick = (image) => {
    const img = new Image();
    img.src = image.urls.full; // Preload the full-sized image
    setBlurActive(true);
    setMaxImage(image);
  };

  //collection click
  const handleCollection = () => {
    setBlurActive(false);
    console.log("collection");
  };

  useEffect(() => {
    setSearchActive(input.length === 0 ? false : true);
  }, [searchActive, input]);

  //tracing arrow active gsap animation
  useEffect(() => {
    if (arrowActive) {
      gsap.to(".arrowIcon", { rotation: 180, duration: 0.5 });
    } else {
      gsap.to(".arrowIcon", { rotation: 0, duration: 0.5 });
    }
  }, [arrowActive]);

  return (
    <div
      className="flex flex-col items-center justify-center font-Tilt-Neon px-3"
      style={{ minHeight: "80vh" }}
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
      <div className="max-w-7xl w-full flex gap-5 justify-center flex-wrap">
        {images.map((image) => (
          <div
            className="relative w-40 sx:w-44 mdd:w-60 lg:w-80 xl:w-96"
            key={image.id}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <a href={image.urls.small} onClick={(e) => e.preventDefault()}>
                <LazyImage
                  key={image.id}
                  src={image.urls.small}
                  alt={image.alt_description}
                  onClick={() => imageClick(image)}
                  onMouseEnter={() => setHover(image.id)}
                  onMouseLeave={() => setHover(null)}
                  className="w-full h-full cursor-pointer"
                />
              </a>
            </Suspense>
            {hover === image.id && (
              <ImageOverlay handleCollection={handleCollection} />
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={prevClick}>Prev</button>
        <button onClick={nextClick}>Next</button>
      </div>
      {blurActive && (
        <div
          className="w-full h-full fixed top-0 right-0 left-0 bottom-0 py-5 px-2 flex flex-col items-center overflow-y-auto hide-scrollbar"
          style={{ backgroundColor: "rgba(109, 107, 107, 0.219)" }}
        >
          <div className="max-w-5xl w-full flex justify-end">
            <CloseIcon
              className="cursor-pointer"
              sx={{ fontSize: "40px", color: "white" }}
              onClick={() => {
                setZoom(false);
                setBlurActive(false);
                setIsLoading(true);
              }}
            />
          </div>
          <div className="bg-white max-w-5xl w-full rounded-xl h-fit p-3 flex flex-col gap-3">
            <div className="flex gap-2 items-start">
              <button
                className="flex items-center gap-2 rounded-md border-gray-400 p-3"
                style={{ borderWidth: "0.1px" }}
              >
                Collect <BookmarksOutlinedIcon />
              </button>
              <button
                className="flex items-center gap-2 rounded-md border-gray-400 p-3 text-lg"
                style={{ borderWidth: "0.1px" }}
              >
                Likes <FavoriteBorderOutlinedIcon />
              </button>
              <div
                className="flex items-center justify-between rounded-md w-52 text-white"
                style={{ backgroundColor: "#05A081" }}
              >
                <p className="p-3">Free Download</p>
                <hr className="w-[1px] h-8 bg-black text-black" />
                <div
                  className="p-3 arrowIcon"
                  onClick={() => {
                    setArrowActive(!arrowActive);
                  }}
                >
                  <KeyboardArrowDownIcon />
                </div>
              </div>
            </div>
            <div className="self-center" key={maxImage.id}>
              <Suspense fallback={<div>Loading...</div>}>
                {isLoading && (
                  <Skeleton
                    variant="rectangular"
                    width={700}
                    height={500}
                    animation="wave"
                    className="rounded-md"
                  />
                )}
                <img
                  src={maxImage.urls.full}
                  alt=""
                  className={`rounded-lg max-h-[85vh] ${
                    zoom ? "cursor-zoom-out" : "cursor-zoom-in"
                  } ${isLoading ? "" : "block"}`}
                  onClick={() => setZoom(!zoom)}
                  onLoad={() => {
                    setIsLoading(false);
                  }}
                />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnsplashImages;
