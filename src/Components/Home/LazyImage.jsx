import React from "react";

const LazyImage = ({
  src,
  alt,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
    />
  );
};

export default LazyImage;
