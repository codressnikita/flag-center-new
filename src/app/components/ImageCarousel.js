export default function ImageCarousel({ images, currentIndex }) {
  return (
    <div
      className="image-carousel-wrapper"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden", // Prevent overflow during transitions
      }}
    >
      {/* Container for all images */}
      <div
        className="image-carousel-container"
        style={{
          display: "flex",
          flexDirection: "column",
          height: `${images.length * 100}vh`, // Total height depends on number of images
          transform: `translateY(-${currentIndex * 100}vh)`, // Slide to the current image
          transition: "transform 0.5s ease", // Smooth sliding effect
        }}
      >
        {/* Render all images */}
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            style={{
              width: "100%",
              height: "100vh", // Each image takes the full height of the viewport
              objectFit: "contain",
            }}
          />
        ))}
      </div>
    </div>
  );
}
