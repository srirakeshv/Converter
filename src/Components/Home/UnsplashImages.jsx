import React, { useState, useEffect, lazy, Suspense } from "react";
import "tailwindcss/tailwind.css";
import SearchIcon from "@mui/icons-material/Search"; //icon
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; //icon
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"; //icon
import FavoriteIcon from "@mui/icons-material/Favorite"; //icon
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined"; //icon
import BookmarksIcon from "@mui/icons-material/Bookmarks"; //icon
import CloseIcon from "@mui/icons-material/Close"; //icon
import gsap from "gsap"; //motion
import "../Home/Css/UnsplashImage.css"; //external css for scroll off
import Skeleton from "@mui/material/Skeleton";
import SaveAltIcon from "@mui/icons-material/SaveAlt"; //icon
import Pagination from "@mui/material/Pagination";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded"; //icon
import DownloadArea from "./DownloadArea"; //download dropdown

const LazyImage = lazy(() => import("./LazyImage"));

const UnsplashImages = () => {
  const [images, setImages] = useState([]); //setting an updating the api array of images
  const [pageNumber, setPageNumber] = useState(1); //setting and updating pages when click event
  const [totalNumber, setTotalNumber] = useState(); //setting and updating total pages in api based on search
  const [input, setInput] = useState(""); //updating input value
  const [blurActive, setBlurActive] = useState(false); //setting blur when onclick
  const [maxImage, setMaxImage] = useState(""); //showing images of onclicked image in max view
  const [arrowActive, setArrowActive] = useState(false); //arrow setting dropdown menu
  const [hover, setHover] = useState(null); //setting hover status for images
  const [zoom, setZoom] = useState(false); //setting zoom images
  const [isLoading, setIsLoading] = useState(true); //setting skeleton before image load
  const [like, setLike] = useState(false); //setting and updating like
  const [bookmark, setBookmark] = useState(false); //setting and updating bookmark
  const [downloadActive, setDownloadActive] = useState(false); //setting download dropdown active
  const [isscrolled, setisscrolled] = useState(false);

  //fetching api for images
  useEffect(() => {
    const fetchImages = async (page = pageNumber, perPage = 30) => {
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
  // const prevClick = () => {
  //   const total = totalNumber + 1;
  //   let prev = 0;
  //   if (pageNumber - 1 <= 0) {
  //     console.log("n");
  //   } else {
  //     prev = (pageNumber - 1 + total) % total;
  //     console.log(prev);
  //     setPageNumber(prev);
  //   }
  // };

  //for next click
  // const nextClick = () => {
  //   const total = totalNumber + 1;
  //   let next = 0;
  //   if (pageNumber + 1 >= totalNumber + 1) {
  //     console.log("y");
  //   } else {
  //     next = (pageNumber + 1) % total;
  //     console.log(next);
  //     setPageNumber(next);
  //   }
  // };

  //imageclick
  const imageClick = (image) => {
    setHover(null);
    const img = new Image();
    img.src = image.urls.full; // Preload the full-sized image
    setBlurActive(true);
    setMaxImage(image);
  };

  //collection click
  const handleCollection = () => {
    console.log("collection");
  };

  //tracing arrow active gsap animation
  useEffect(() => {
    if (arrowActive) {
      gsap.to(".arrowIcon", { rotation: 180, duration: 0.3 });
    } else {
      gsap.to(".arrowIcon", { rotation: 0, duration: 0.3 });
    }
  }, [arrowActive]);

  // Define breakpoints for skeleton width
  const breakpoints = {
    xs: 400,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  };

  // Determine skeleton width based on screen size
  const getSkeletonWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < breakpoints.sm) {
      return 340; // Set width for extra-small screens
    } else if (screenWidth < breakpoints.sm) {
      return 420; // Set width for extra-small screens
    } else if (screenWidth < breakpoints.md) {
      return 540; // Set width for small screens
    } else if (screenWidth < breakpoints.lg) {
      return 570; // Set width for medium screens
    } else if (screenWidth < breakpoints.xl) {
      return 650; // Set width for large screens
    } else {
      return 700; // Set default width for extra-large screens
    }
  };

  //changing pagenumber
  const handleChangePage = (event, value) => {
    setPageNumber(value);
  };

  //updating and viewing download dropdown
  const downloadClick = () => {
    setDownloadActive(!downloadActive);
  };

  //checking for top scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 90) {
        setisscrolled(true);
      } else {
        setisscrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  //setting main scroll of when bluractive
  useEffect(() => {
    if (blurActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [blurActive]);

  return (
    <div
      className="flex flex-col items-center justify-center font-Tilt-Neon px-3"
      style={{ minHeight: "80vh" }}
    >
      <form className={`sticky top-5 z-10 max-w-7xl w-full my-3 `}>
        <input
          className={`w-full p-3 outline-none border-2 rounded-full px-7  ${
            isscrolled
              ? "bg-white text-blue-400 border-blue-400"
              : "border-blue-400 bg-sky-950 text-white"
          }`}
          type="text"
          placeholder="search picture what you want"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setPageNumber(1);
          }}
        />
        <SearchIcon
          className={`absolute top-1/2 right-5 transform -translate-y-1/2 ${
            isscrolled ? "text-blue-400" : "text-white"
          }`}
          fontSize="large"
        />
      </form>
      <div className="max-w-7xl w-full flex gap-5 justify-center flex-wrap">
        {images.map((image) => (
          <div
            className="relative w-40 sx:w-44 mdd:w-60 lg:w-80 xl:w-96"
            key={image.id}
            onMouseEnter={() => setHover(image.id)}
            onMouseLeave={() => setHover(null)}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <a href={image.urls.small} onClick={(e) => e.preventDefault()}>
                <LazyImage
                  key={image.id}
                  src={image.urls.small}
                  alt={image.alt_description}
                  onClick={() => imageClick(image)}
                  className="w-full h-full cursor-pointer"
                />
              </a>
            </Suspense>
            {hover === image.id && (
              <button
                className="hidden md:flex absolute top-4 right-16 z-1 w-10 h-10 rounded-lg bg-white justify-center items-center cursor-default"
                onClick={() => {
                  handleCollection();
                }}
              >
                <BookmarksOutlinedIcon />
              </button>
            )}
            {hover === image.id && (
              <button
                className="hidden md:flex absolute top-4 right-4 z-1 w-10 h-10 rounded-lg bg-white justify-center items-center cursor-default"
                onClick={() => {
                  handleCollection();
                }}
              >
                <FavoriteBorderOutlinedIcon />
              </button>
            )}
            {hover === image.id && (
              <div
                className={`hidden md:flex absolute bottom-4 right-4 z-1 items-center justify-center rounded-full w-40 text-white cursor-default`}
                style={{ backgroundColor: "#048369" }}
              >
                <button
                  className="p-3 flex gap-2 items-center justify-center cursor-default"
                  onClick={() => imageClick(image)}
                >
                  Download <FileDownloadRoundedIcon />
                </button>
              </div>
            )}
            <div className="sm:hidden absolute bottom-2 right-2 rounded-md w-9 h-5 flex items-center justify-center bg-white">
              <SaveAltIcon sx={{ fontSize: "15px" }} />
            </div>
          </div>
        ))}
      </div>
      {/* <div className="flex gap-2">
        <button onClick={prevClick}>Prev</button>
        <button onClick={nextClick}>Next</button>
      </div> */}
      <div className="my-5">
        <Pagination
          count={totalNumber}
          color="secondary"
          page={pageNumber}
          onChange={handleChangePage}
        />
      </div>
      {/* blur active */}
      {blurActive && (
        <div
          className="w-full h-full fixed top-0 right-0 left-0 z-20 bottom-0 py-5 px-2 flex flex-col items-center overflow-y-auto hide-scrollbar"
          style={{ backgroundColor: "rgba(31, 30, 30, 0.801)" }}
        >
          <div className="max-w-5xl w-full flex justify-end">
            <CloseIcon
              className="cursor-pointer"
              sx={{ fontSize: "40px", color: "white" }}
              onClick={() => {
                setZoom(false);
                setBlurActive(false); //closing the bluractive
                setIsLoading(true); // activating the skeleton for next image
                setDownloadActive(false); //deactivating the dwonload dropdown
                setArrowActive(false); //returning the arrow to original position
              }}
            />
          </div>
          <div className="bg-white max-w-5xl w-full rounded-xl h-fit p-3 flex flex-col gap-4">
            <div className="flex gap-2 items-center justify-between">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full">
                  <img
                    src={maxImage.user.profile_image.large}
                    alt="Profile"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <p className="font-medium text-base sm:text-xl">
                    {maxImage.user.first_name} {maxImage.user.last_name}
                  </p>
                  <p className="text-gray-500 text-sm sm:text-base">
                    {maxImage.user.username}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center relative">
                <button
                  className="flex items-center gap-2 rounded-md border-gray-400 p-3"
                  style={{ borderWidth: "0.1px" }}
                  onClick={() => setBookmark(!bookmark)}
                >
                  {bookmark ? (
                    <BookmarksIcon sx={{ color: "blue" }} />
                  ) : (
                    <BookmarksOutlinedIcon />
                  )}{" "}
                  <span className="hidden md:flex">Collect</span>
                </button>
                <button
                  className="flex items-center gap-2 rounded-md border-gray-400 p-3 text-lg"
                  style={{ borderWidth: "0.1px" }}
                  onClick={() => setLike(!like)}
                >
                  {like ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon />
                  )}{" "}
                  <span className="hidden md:flex">Likes</span>{" "}
                  <span className="text-gray-500">{maxImage.likes}</span>
                </button>
                <div
                  className="hidden sm:flex items-center justify-between rounded-md w-52 text-white"
                  style={{ backgroundColor: "#05A081" }}
                  onClick={downloadClick}
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
                {downloadActive && <DownloadArea image={maxImage} />}
              </div>
            </div>
            <div className="self-center" key={maxImage.id}>
              <Suspense fallback={<div>Loading...</div>}>
                {isLoading && (
                  <Skeleton
                    variant="rectangular"
                    width={getSkeletonWidth()}
                    height={500}
                    animation="wave"
                    className="rounded-md"
                  />
                )}
                <img
                  src={maxImage.urls.regular}
                  alt={maxImage.description}
                  className={`rounded-lg max-h-[85vh] ${
                    zoom ? "cursor-zoom-out" : "cursor-zoom-in"
                  } ${isLoading ? "hidden" : "flex"}`}
                  onClick={() => setZoom(!zoom)}
                  onLoad={() => {
                    setIsLoading(false);
                  }}
                />
              </Suspense>
            </div>
            <div
              className="self-center flex sm:hidden mt-10 sm:mt-0 items-center justify-between rounded-md w-52 text-white"
              style={{ backgroundColor: "#05A081" }}
              onClick={downloadClick}
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
        </div>
      )}
    </div>
  );
};

export default UnsplashImages;
