import React, { useState, useEffect } from "react";

function UnsplashImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/?client_id=oCWdYYvYZwAIRfOW7O9pBKpPKVsaPpayb8VEqYolSQU`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        console.log(data);
        console.log(data.length);
        setImages(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UnsplashImages;
