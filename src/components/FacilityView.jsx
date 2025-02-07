import { useState, useRef, useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { FaRegPlayCircle } from "react-icons/fa";

const VideoPlayer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    // Initialize AOS library
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });

    // Handle header visibility on scroll
    const handleScroll = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setHeaderVisible(rect.top <= window.innerHeight && rect.bottom >= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount to set initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="text-center p-8 bg-black pt-20">
      {/* Header Section */}
      <div
        ref={headerRef}
        className={`text-center bg-black mb-10 pb-10 sm:mb-12 transform transition-all duration-1000 ${
          headerVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0"
        }`}
        data-aos="fade-up"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-transparent tracking-wide relative font-outline-2 bg-black">
          OUR
          <a
            href="https://www.youtube.com/watch?v=1Qj2Djn6jNs "
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            FACILITIES
          </a>
        </h2>
      </div>

      {/* Video Thumbnail */}
      <div
        className="relative inline-block cursor-pointer w-full max-w-4xl mx-auto"
        onClick={() => setIsModalOpen(true)}
        data-aos="zoom-in"
      >
        <img
          src="https://i.ytimg.com/vi/rdp3afTYSCI/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGGUgYShTMA8=&rs=AOn4CLDYNTKW8j4-pMLPjmehF3yyJqTTHw" // Replace with your video thumbnail
          alt="Video Thumbnail"
          className="w-full rounded-lg"
        />
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/80 rounded-full p-4 text-4xl">
          <FaRegPlayCircle />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
          data-aos="fade-in"
        >
          <div
            className="relative w-11/12 max-w-4xl bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/watch?v=1Qj2Djn6jNs"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-black/50 hover:bg-black/70 rounded-full p-2"
              onClick={() => setIsModalOpen(false)}
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
