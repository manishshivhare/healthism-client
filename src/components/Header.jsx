import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { RiArrowDownWideFill } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles

const Header = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 500, easing: "ease-in-out" });

    // Scroll listener
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Dynamic styles based on scroll
  const videoStyles = {
    transform: `translateY(${scrollY * 0.5}px)`,
    opacity: Math.max(1 - scrollY / 600, 0.5), // Fade out video
  };

  const textStyles = {
    transform: `translateY(${scrollY * 0.3}px)`,
    opacity: Math.max(1 - scrollY / 400, 0),
  };

  const scrollToSubscriptions = () => {
    const element = document.getElementById("subscription-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="relative w-full h-screen bg-gradient-to-br  ">
      {/* Navbar positioned at the top */}
      <div className="fixed top-0 z-50 ">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="relative h-full w-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="absolute inset-0 min-w-full min-h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            loading="lazy"
            style={videoStyles}
          >
            <source
              src="https://res.cloudinary.com/dkhwvrr2w/video/upload/v1737614813/video_header_qivzhz.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0"></div>
        </div>

        {/* Content Overlay */}
        <div
          className="relative z-10 flex items-center justify-center h-full mt-11"
          style={textStyles}
        >
          <div className="text-center text-white px-4 gap-12">
            <h1
              className="text-5xl md:text-6xl font-bold mb-4 text-shadow-md"
              data-aos="fade-up"
            >
              Welcome to{" "}
              <span className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-[#dc4511] via-yellow-200 to-white text-transparent bg-clip-text">
                Healthism
              </span>
            </h1>
            <p
              className="text-xl md:text-3xl mb-8 text-shadow-md font-bold font-sans"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Invest in Your Health, Invest in Yourself
            </p>
            <div className="flex justify-center gap-4 mb-8 font-bold">
              <button
                onClick={scrollToSubscriptions}
                className="border-orange-500 border-2  hover:bg-transparent text-white px-8 py-3 text-lg font-medium bg-orange-500 transition-colors duration-200 rounded-md "
                data-aos="fade-up"
                data-aos-delay="400"
              >
                GET STARTED
              </button>
            </div>
            <div
              className="flex justify-center items-center mt-8"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <RiArrowDownWideFill className="text-6xl md:text-7xl text-white animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
