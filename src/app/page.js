"use client";

import { useState, useEffect } from "react";
import ImageCarousel from "./components/ImageCarousel";
import BackButtons from "./components/BackButtons"; // Import the BackButtons component
import contents from "/public/contents.json";

export default function Page() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentParent, setCurrentParent] = useState(null);

  // Utility to find the parent object for a given index
  const getParentForIndex = (index) => {
    let accumulatedCount = 0;

    for (const section of contents) {
      const sectionImageCount = section.images.length;
      if (index < accumulatedCount + sectionImageCount) {
        return section; // Return the entire parent object
      }
      accumulatedCount += sectionImageCount;
    }

    return null; // Default fallback
  };

  useEffect(() => {
    // Flatten all images and keep track of their parents
    const allImages = contents.flatMap((section) => section.images);
    setImages(allImages);

    // Set initial parent
    if (contents.length > 0) {
      setCurrentParent(contents[0]); // Set the first parent object
    }
  }, []);

  const goForward = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1 < images.length ? prevIndex + 1 : 0;
      setCurrentParent(getParentForIndex(newIndex));
      return newIndex;
    });
  };

  const goBack = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1 >= 0 ? prevIndex - 1 : images.length - 1;
      setCurrentParent(getParentForIndex(newIndex));
      return newIndex;
    });
  };

  // If images are not yet loaded, show a loading indicator
  if (images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ImageCarousel images={images} currentIndex={currentIndex} />
      <BackButtons goBack={goBack} goForward={goForward} />{" "}
      {/* Use the BackButtons component */}
    </div>
  );
}
