import React, { useState, useEffect } from "react";

const UnsplashImages = () => {
  const [images, setImages] = useState([]); //setting an updating the api array of images
  const [loading, setLoading] = useState(true); //before receiving the response from the api
  const [pageNumber, setPageNumber] = useState(1); //setting and updating pages when click event
  const [totalNumber, setTotalNumber] = useState();
  const [input, setInput] = useState("");

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
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        setTotalNumber(data.total_pages);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
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

  return (
    <div className="flex flex-col items-center">
      <form className="max-w-7xl w-full">
        <input
          className="w-full my-3 p-3 outline-none border-2 border-blue-400 rounded-full"
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="max-w-7xl w-full flex gap-5 justify-center flex-wrap">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
            />
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={prevClick}>Prev</button>
        <button onClick={nextClick}>Next</button>
      </div>
    </div>
  );
};

export default UnsplashImages;
