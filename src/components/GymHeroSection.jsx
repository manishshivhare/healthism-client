import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const GymHeroSection = () => {
  const quotes = [
    "Transform your body, transform your life.",
    "Your only limit is you.",
    "Make yourself stronger than your excuses.",
    "The only bad workout is the one that didn't happen.",
    "Success starts with self-discipline.",
  ];

  const scrollToSubscriptions = () => {
    const element = document.getElementById('subscription-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [currentQuote, setCurrentQuote] = useState(0);

  // Rotate through quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    // Initialize AOS
    AOS.init({ duration: 1000, easing: 'ease-in-out' });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-black min-h-[500px] flex flex-col items-center justify-center p-8">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-black" />

      {/* Content container */}
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center">
        {/* Logo placeholder - replace src with your actual logo */}
        <div className="mb-12" data-aos="fade-up">
          <div className="bg-black p-4 rounded-full inline-block mb-4">
            <img className="h-[8rem]" src='https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737615155/udz5qhgjlpoh7aywyyqp.png' alt="Healthism" />
          </div>
        </div>

        {/* Animated quote section */}
        <div className="min-h-[120px]" data-aos="fade-up" data-aos-delay="200">
          <p className="text-white text-4xl font-bold mb-6 transition-opacity duration-500">
            {quotes[currentQuote]}
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToSubscriptions}
          className="mt-8 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg text-lg transition-colors duration-300"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          START YOUR FITNESS JOURNEY
        </button>

        {/* Quote navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentQuote === index ? "bg-orange-600" : "bg-gray-600"
              }`}
              aria-label={`Quote ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GymHeroSection;
