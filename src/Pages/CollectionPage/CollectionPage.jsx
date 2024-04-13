import React, { useEffect } from "react";
import Navbar from "../../Components/Common/Navbar";
import CollectionImages from "../../Components/Collection/CollectionImages";

const CollectionPage = () => {
  useEffect(() => {
    document.title = "Splash | Collections";
  });
  return (
    <div className="bg-sky-950" style={{ minHeight: "100vh" }}>
      <Navbar />
      <CollectionImages />
    </div>
  );
};

export default CollectionPage;
