import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import { Dumbbell, HeartPulse, Users } from "lucide-react";

const AboutHeader = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerStyles = {
    transform: `translateY(${scrollY * 0.3}px)`,
    opacity: Math.max(1 - scrollY / 600, 0.6),
    transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Navbar */}
      <div className="fixed top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div style={headerStyles}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-32 text-left flex items-center justify-center h-full">
        <div className="max-w-3xl text-center" data-aos="fade-right">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Transform Your Body, Transform Your Life
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed animate-slide-in">
            Welcome to Elite Fitness, where we believe in pushing boundaries and
            achieving the extraordinary. Our state-of-the-art facility, expert
            trainers, and supportive community are here to help you reach your
            fitness goals.
          </p>

          {/* Fitness Features with Advanced Animations */}
          <div
            className="flex justify-center gap-8 mt-8 text-white"
            data-aos="fade-up"
          >
            <div className="flex flex-col items-center transform hover:scale-110 transition duration-500">
              <Dumbbell size={40} className="text-red-400 animate-bounce" />
              <p className="mt-2 text-lg font-semibold">Strength Training</p>
            </div>
            <div className="flex flex-col items-center transform hover:scale-110 transition duration-500">
              <HeartPulse size={40} className="text-blue-400 animate-pulse" />
              <p className="mt-2 text-lg font-semibold">Cardio Workouts</p>
            </div>
            <div className="flex flex-col items-center transform hover:scale-110 transition duration-500">
              <Users size={40} className="text-green-400 animate-bounce" />
              <p className="mt-2 text-lg font-semibold">Community Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>
  );
};

export default AboutHeader;
