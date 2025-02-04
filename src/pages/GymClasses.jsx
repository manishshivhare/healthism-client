import { useEffect, useRef, useState } from "react";
import { Users, Clock, Star, Search, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { classes } from "../content/siteContent";

const ClassCard = ({
  title,
  description,
  icon: Icon,
  color,
  backgroundImage,
  difficulty,
  duration,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-zinc-900 rounded-lg shadow-lg overflow-hidden border border-zinc-800 transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative h-48 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div
          className={`absolute top-4 left-4 w-12 h-12 rounded-full ${color} flex items-center justify-center shadow-lg`}
        >
          <Icon className="text-white" size={24} />
        </div>

        <div className="absolute top-4 right-4 bg-black bg-opacity-50 px-3 py-1 rounded-full">
          <div className="flex items-center">
            {[...Array(difficulty)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className="text-yellow-400"
                fill="#fbbf24"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2 hover:line-clamp-none transition-all duration-300">
          {description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-gray-400">
            <span className="text-sm">Duration : {duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const GymClasses = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const headerRef = useRef(null);
  const loadingRef = useRef(null);

  const filteredClasses = classes
    .filter(
      (classItem) =>
        classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        classItem.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((classItem) =>
      filterType === "all" ? true : classItem.type === filterType
    );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (
          firstEntry.isIntersecting &&
          !isLoading &&
          visibleCount < filteredClasses.length
        ) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, filteredClasses.length, isLoading]);

  const loadMoreItems = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 4, filteredClasses.length));
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.8;
        setHeaderVisible(rect.top <= triggerPoint);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClickOutside = (e) => {
    if (!e.target.closest(".filter-container")) {
      setIsFilterOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setVisibleCount(8);
  }, [searchQuery, filterType]);

  return (
    <section className="bg-black py-16 min-h-screen">
      <div className="fixed top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 pt-20 pb-4">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-[3rem] sm:text-[2.5rem] lg:text-[5rem] font-bold relative font-outline-2">
            <span className="absolute inset-0 text-gray-400 font-extrabold tracking-wider text-[2rem] sm:text-[1rem] lg:text-[8rem] opacity-10 select-none">
              CLASSES
            </span>
            <span className="text-white">CLASSES</span>
            <p className="text-white hover:underline cursor-pointer">
              WE PROVIDE
            </p>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mt-6">
            Transform your fitness journey with our expert-led classes. From
            high-intensity workouts to mindful movement, find your perfect fit.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search classes..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>

            <div className="relative w-full sm:w-48 filter-container">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFilterOpen(!isFilterOpen);
                }}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white flex items-center justify-between"
              >
                <span>
                  {filterType === "all"
                    ? "All Classes"
                    : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </span>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform duration-200 ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isFilterOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-md overflow-hidden z-10">
                  {["all", "strength", "cardio", "yoga", "dance"].map(
                    (type) => (
                      <button
                        key={type}
                        className="w-full px-4 py-2 text-left text-white hover:bg-zinc-800 transition-colors"
                        onClick={() => {
                          setFilterType(type);
                          setIsFilterOpen(false);
                        }}
                      >
                        {type === "all"
                          ? "All Classes"
                          : type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredClasses.slice(0, visibleCount).map((classItem, index) => (
            <ClassCard key={index} {...classItem} index={index} />
          ))}
        </div>

        {visibleCount < filteredClasses.length && (
          <div
            ref={loadingRef}
            className="flex justify-center items-center py-8"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default GymClasses;
