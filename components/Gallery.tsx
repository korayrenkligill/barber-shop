"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";

type ImageData = {
  src: string;
  alt: string;
};

const images: ImageData[] = [
  { src: "https://placehold.co/400x600", alt: "Image 1" },
  { src: "https://placehold.co/400x800", alt: "Image 2" },
  { src: "https://placehold.co/400x500", alt: "Image 3" },
  { src: "https://placehold.co/400x700", alt: "Image 4" },
  { src: "https://placehold.co/400x650", alt: "Image 5" },
  { src: "https://placehold.co/400x550", alt: "Image 6" },
  { src: "https://placehold.co/400x750", alt: "Image 7" },
  { src: "https://placehold.co/400x600", alt: "Image 8" },
];

const ImageCard: React.FC<{
  image: ImageData;
  index: number;
  setSelectedImage: React.Dispatch<React.SetStateAction<ImageData | null>>;
}> = ({ image, index, setSelectedImage }) => {
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      key={index}
      className={classNames(
        "relative overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 h-[350px] rounded-2xl"
      )}
      style={{
        transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1)",
      }}
      onClick={() => setSelectedImage(image)}
    >
      <div
        className="absolute inset-0 blur-sm"
        style={{
          backgroundImage: `url(${image.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 bg-black opacity-30" />

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-contain w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <div className="container mx-auto px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {images.map((image, index) => (
          <ImageCard
            key={index}
            image={image}
            index={index}
            setSelectedImage={setSelectedImage}
          />
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-12"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt}
            width={1000}
            height={800}
            className="object-contain w-full h-full max-w-4xl max-h-screen"
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
