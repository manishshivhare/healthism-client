import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutHeader = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Dynamic styles for scroll animations
  const headerStyles = {
    transform: `translateY(${scrollY * 0.5}px)`,
    opacity: Math.max(1 - scrollY / 500, 0),
  };

  const textStyles = {
    transform: `translateY(${scrollY * 0.3}px)`,
    opacity: Math.max(1 - scrollY / 700, 0),
  };

  return (
    <div className="relative w-full h-screen">
      {/* Navbar */}
      <div className="fixed top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613653/inl7fsmzgsl437a6gttq.jpg)`,
          ...headerStyles,
        }}
      >
        {/* Dark overlay */}
        {/* <div className="absolute inset-0 bg-black/60"></div> */}

        {/* Watermark "About Us" Text */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={textStyles}
        >
          <h1
            className="text-white text-[10vw] sm:text-[8rem] md:text-[10rem] font-bold   tracking-wide"
            style={{
              WebkitTextStroke: "1px white",
              color: "transparent",
              opacity: 0.4,
            }}
            data-aos="fade-left"
          >
            ABOUT US
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32 text-left pt-10">
        <div className="max-w-3xl" data-aos="fade-right">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 pt-10">
            Transform Your Body, Transform Your Life
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
            Welcome to Elite Fitness, where we believe in pushing boundaries and
            achieving the extraordinary. Our state-of-the-art facility, expert
            trainers, and supportive community are here to help you reach your
            fitness goals.
          </p>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>
  );
};

export default AboutHeader;
