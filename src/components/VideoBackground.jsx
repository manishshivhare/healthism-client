import { useEffect, useRef, useState } from "react";

const VideoBackground = () => {
  const videoContainerRef = useRef(null);
  const [scrollEffect, setScrollEffect] = useState(1); // Adjust for scaling or opacity

  useEffect(() => {
    const handleScroll = () => {
      if (videoContainerRef.current) {
        const rect = videoContainerRef.current.getBoundingClientRect();
        const offset = rect.top / window.innerHeight;

        // Adjust effect based on scroll position
        setScrollEffect(Math.max(1 - offset * 0.5, 0.7)); // Minimum scale is 0.7
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={videoContainerRef}
      className="relative h-[50vh] w-full overflow-hidden bg-black"
    >
      {/* Video container */}
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${scrollEffect})`,
          opacity: scrollEffect,
          transition: "transform 0.1s, opacity 0.1s",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          loading="lazy"
        >
          <source src='https://res.cloudinary.com/dkhwvrr2w/video/upload/v1737614782/video-1_huzowr.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay */}
    </div>
  );
};

export default VideoBackground;
