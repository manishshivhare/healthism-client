import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Dumbbell, Heart, Target, Users } from "lucide-react";

const CoreValues = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });

    // Header visibility observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const values = [
    {
      icon: <Dumbbell className="w-12 h-12 mb-4 text-blue-600 bg-black" />,
      title: "Excellence",
      description:
        "Committed to delivering the highest quality fitness experience through expert guidance and state-of-the-art facilities",
      animation: "fade-up",
    },
    {
      icon: <Heart className="w-12 h-12 mb-4 text-red-600" />,
      title: "Wellness",
      description:
        "Promoting holistic health and well-being through balanced fitness approaches and supportive community",
      animation: "fade-up",
    },
    {
      icon: <Target className="w-12 h-12 mb-4 text-green-600" />,
      title: "Results",
      description:
        "Focused on helping members achieve their personal fitness goals through proven methods and consistent support",
      animation: "fade-up",
    },
    {
      icon: <Users className="w-12 h-12 mb-4 text-purple-600" />,
      title: "Community",
      description:
        "Building a welcoming, inclusive environment where members inspire and motivate each other",
      animation: "fade-up",
    },
  ];

  return (
    <div className="w-full mx-auto bg-black ">
      <div
        ref={headerRef}
        className={`text-center mb-10 pb-10 sm:mb-12 transform transition-all duration-1000 ${
          headerVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-transparent tracking-wide relative font-outline-2">
          CORE VALUES WE{" "}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline "
          >
            BELIEVE IN
          </a>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
        {values.map((value, index) => (
          <div
            key={index}
            data-aos={value.animation}
            data-aos-delay={index * 100}
            className="bg-black rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-800 "
          >
            <div className="flex flex-col items-center text-center ">
              <div className="rounded-full bg-black p-4 mb-6">{value.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {value.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreValues;
