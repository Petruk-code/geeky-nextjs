'use client';

/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageFallback = (props) => {
  const { src, fallback, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src || fallback || null);

  useEffect(() => {
    setImgSrc(src || fallback || null);
  }, [src, fallback]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallback || null);
      }}
    />
  );
};

export default ImageFallback;
