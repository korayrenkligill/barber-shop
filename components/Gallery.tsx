"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { useInView } from "framer-motion";

type ImageData = {
  src: string;
  alt: string;
};

const images: ImageData[] = [
  { src: "https://picsum.photos/400/500", alt: "Image 1" },
  { src: "https://picsum.photos/400/300", alt: "Image 2" },
  { src: "https://picsum.photos/600/700", alt: "Image 3" },
  { src: "https://picsum.photos/400/500", alt: "Image 1" },
  { src: "https://picsum.photos/400/300", alt: "Image 2" },
  { src: "https://picsum.photos/600/700", alt: "Image 3" },
  { src: "https://picsum.photos/400/500", alt: "Image 1" },
  { src: "https://picsum.photos/400/300", alt: "Image 2" },
  // Galerinize eklemek istediğiniz resimler
];

const ImageCard: React.FC<{
  image: ImageData;
  index: number;
  setSelectedImage: React.Dispatch<React.SetStateAction<ImageData | null>>;
}> = ({ image, index, setSelectedImage }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div
      ref={ref}
      key={index}
      className={classNames(
        "relative overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300",
        index % 2 === 0 ? "row-span-2" : "row-span-1"
      )}
      style={{
        transform: isInView ? "scale(1)" : "scale(.5)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)",
      }}
      onClick={() => setSelectedImage(image)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={300}
        height={index % 2 === 0 ? 400 : 200}
        className="object-cover w-full h-full rounded-xl"
      />
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
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt}
            width={1000}
            height={600}
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
