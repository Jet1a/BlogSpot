"use client";

import previewImage from "@/app/assets/images/imagePlaceholder.png";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImagePreviewProps {
  imageUrl?: string;
}

const ImagePreview = ({ imageUrl }: ImagePreviewProps) => {
  const [validSrc, setValidSrc] = useState<string | typeof previewImage>(
    previewImage
  );

  useEffect(() => {
    if (!imageUrl) {
      setValidSrc(previewImage);
      return;
    }

    const img = new window.Image();
    img.src = imageUrl;

    img.onload = () => setValidSrc(imageUrl);
    img.onerror = () => setValidSrc(previewImage);
  }, [imageUrl]);

  return (
    <>
      <Image
        src={validSrc}
        alt="Blog featured image"
        width={500}
        height={500}
        className="w-full h-72 object-cover transition-transform duration-300 mb-4"
      />
    </>
  );
};

export default ImagePreview;
