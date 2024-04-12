import React from "react";
import "tailwindcss/tailwind.css";
import { Collection } from "./CollectionProvider";

const CollectionImages = () => {
  const { collectImage } = Collection() || { collectImg: [] };
  return (
    <div className="flex justify-center font-Tilt-Neon mt-10">
      <div className="max-w-7xl w-full px-2">
        <ul className="flex gap-3 items-center text-base sm:text-2xl text-white">
          <li className="p-2 px-6 rounded-full bg-blue-500 flex gap-2 items-center">
            Collections{" "}
            <span className="text-gray-300">{collectImage.length}</span>
          </li>
          <li className="flex gap-2 items-center">
            Followers <span className="text-gray-300">0</span>
          </li>
          <li className="flex gap-2 items-center">
            Following <span className="text-gray-300">0</span>
          </li>
        </ul>
        <div className="my-5 ml-2 flex gap-3 justify-center flex-wrap">
          {collectImage.map((img) => (
            <div className="w-60" key={img.id}>
              <img
                src={img.urls.small}
                alt={img.alt_description}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionImages;
