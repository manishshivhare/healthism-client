import React, { useEffect, useRef } from "react";
import { Instagram } from "lucide-react";
import { instagramImages } from "../content/siteContent";

const InstagramGallery = () => {
  const useElementOnScreen = (options) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = React.useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      }, options);

      if (containerRef.current) observer.observe(containerRef.current);

      return () => {
        if (containerRef.current) observer.unobserve(containerRef.current);
      };
    }, [options]);

    return [containerRef, isVisible];
  };

  const [headerRef, headerVisible] = useElementOnScreen({ threshold: 0.2 });
  const imageRefs = instagramImages.map(() =>
    useElementOnScreen({ threshold: 0.2 })
  );

  return (
    <div className="w-full bg-gradient-to-br from-black via-gray-900 to-black  min-h-screen py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      {/* Instagram Follow Section */}
      <div
        ref={headerRef}
        className={`text-center mb-10 pb-10 sm:mb-12 transform transition-all duration-1000 ${
          headerVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-transparent tracking-wide relative font-outline-2">
          <span className="absolute inset-0 text-gray-800 font-extrabold tracking-wider text-[4rem] lg:text-[8rem] opacity-10 select-none ">
            INSTAGRAM
          </span>
          FOLLOW US ON{" "}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline "
          >
            INSTAGRAM
          </a>
        </h2>
      </div>

      {/* Responsive Grid Container */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {instagramImages.map((image, index) => {
          const [imageRef, imageVisible] = imageRefs[index];
          return (
            <a
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
              key={image.id}
              ref={imageRef}
              className={`relative overflow-hidden rounded-lg group transform transition-all duration-1000 shadow-lg ${
                imageVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-16 opacity-0"
              }`}
              style={{
                gridColumn: `span ${
                  window.innerWidth >= 1024
                    ? image.colSpan.lg
                    : image.colSpan.sm
                }`,
                gridRow: `span ${
                  window.innerWidth >= 1024
                    ? image.rowSpan.lg
                    : image.rowSpan.sm
                }`,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative aspect-square w-full">
                <img
                  loading="lazy"
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-300 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80 group-hover:opacity-50 transition-all duration-300" />
                {/* Centered View on Instagram Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-black/70 px-4 py-2 text-white text-sm sm:text-base lg:text-lg font-medium flex items-center justify-center gap-2 rounded-lg">
                    <Instagram className="w-5 h-5" />
                    <span className="hidden sm:inline">View on Instagram</span>
                    <span className="sm:hidden">View</span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>
  );
};

export default InstagramGallery;
