import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ParallaxSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const slides = [
    {
      image: 'https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613671/up8u9mps2fq4tk67zvau.jpg',
      title: "CrossFit Training",
      description: "Experience the power and strength of weight lifting",
    },
    {
      image: 'https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613672/kqdh9ixpqpytfrwcoaxo.jpg',
      title: "Weight Lifting",
      description: "Discover the calm and beauty of coastal living",
    },
    {
      image: 'https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613674/zdlavh6o6hdbpuemuke3.jpg',
      title: "Cardio Workout",
      description: "Discover the calm and beauty of coastal living",
    },
    {
      image: 'https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737613676/hv0nga5i9pmtpeeaozwh.jpg',
      title: "High Intensity Interval Training",
      description: "Experience the golden sands and vibrant sunsets",
    },
  ];

  const handleSlideChange = (direction) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      if (direction === "next") {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        handleSlideChange("next");
      } else {
        handleSlideChange("prev");
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const transitionTimer = setTimeout(() => setIsTransitioning(false), 1000);
    return () => clearTimeout(transitionTimer);
  }, [currentSlide]);

  useEffect(() => {
    const autoSlideTimer = setInterval(() => handleSlideChange("next"), 5000);
    return () => clearInterval(autoSlideTimer);
  }, []);

  return (
    <div
      className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isCurrent = index === currentSlide;
          const isPrev =
            index === currentSlide - 1 ||
            (currentSlide === 0 && index === slides.length - 1);
          const isNext =
            index === currentSlide + 1 ||
            (currentSlide === slides.length - 1 && index === 0);

          return (
            <div
              key={index}
              className={`absolute w-full h-full transition-all duration-1000 ease-out transform
                ${
                  isCurrent
                    ? "opacity-100 translate-x-0 z-20"
                    : isPrev
                    ? "opacity-0 -translate-x-full z-10"
                    : isNext
                    ? "opacity-0 translate-x-full z-10"
                    : "opacity-0 translate-x-full z-0"
                }`}
            >
              {/* Background Image with Parallax */}
              <div
                className="absolute w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out will-change-transform"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  transform: `translateX(${
                    (index - currentSlide) * -5
                  }%) scale(${isCurrent ? 1.1 : 1})`,
                }}
              />

              {/* Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-black/20">
                <div className="relative h-full flex flex-col justify-center items-center text-white p-4 md:p-8">
                  <h2
                    className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 transition-all duration-1000 transform  px-4 py-2 rounded-lg
                      ${
                        isCurrent
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                  >
                    {slide.title}
                  </h2>
                  <p
                    className={`text-base md:text-xl text-center max-w-lg transition-all duration-1000 delay-200 transform  px-4 py-2 rounded-lg
                      ${
                        isCurrent
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                  >
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => handleSlideChange("prev")}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-1 md:p-2 transition-all duration-200 z-30"
        disabled={isTransitioning}
      >
        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
      </button>
      <button
        onClick={() => handleSlideChange("next")}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-1 md:p-2 transition-all duration-200 z-30"
        disabled={isTransitioning}
      >
        <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => !isTransitioning && setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 transform
              ${
                index === currentSlide
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/75"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ParallaxSlider;