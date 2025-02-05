import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Dumbbell,
  ShieldCheck,
  HeartPulse,
  Star,
} from "lucide-react";
import { features } from "../content/siteContent.js";
import AOS from "aos";
import "aos/dist/aos.css";

const iconMap = {
  "Strength Training": <Dumbbell className="w-6 h-6 text-orange-300" />,
  "Safety First": <ShieldCheck className="w-6 h-6 text-blue-300" />,
  "Cardio Training": <HeartPulse className="w-6 h-6 text-red-300" />,
  "Premium Facilities": <Star className="w-6 h-6 text-yellow-300" />,
};

const FeaturesTab = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) observer.observe(headerRef.current);

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black  text-gray-300 p-6 h-screen">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header Section */}
        <div
          ref={headerRef}
          data-aos="fade-up"
          className={`text-center mb-3 mt-10 pb-10 sm:mb-12 transform transition-all duration-1000 ${
            headerVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-transparent tracking-wide relative font-outline-2">
            <span className="absolute inset-0 text-gray-800 font-extrabold tracking-wider text-[3rem] lg:text-[8rem] opacity-10 select-none ">
              FEATURES
            </span>
            OUR GYM{" "}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              FEATURES
            </a>
          </h2>
          <p>What makes us different from others</p>
        </div>

        {/* Tabs Header */}
        <div className="overflow-x-auto pb-4 scrollbar-hide flex justify-center">
          <div className="flex space-x-4 min-w-max">
            {features.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveTab(index);
                  setExpandedFeature(null);
                }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 
                  ${
                    activeTab === index
                      ? "bg-orange-500 text-white transform scale-105 shadow-lg"
                      : "bg-gray-800 text-white hover:bg-gray-900 hover:text-white"
                  }`}
              >
                <span className="font-semibold text-lg">
                  {category.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {features[activeTab].items.map((feature, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-gray-900 p-5 rounded-lg cursor-pointer transition-all duration-300 shadow-lg  hover:border-orange-300 hover:shadow-orange-500/50 hover:scale-105"
              onClick={() =>
                setExpandedFeature(expandedFeature === index ? null : index)
              }
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  {iconMap[feature.title] || (
                    <Star className="w-6 h-6 text-gray-300" />
                  )}
                  <h3 className="font-semibold text-lg text-gray-200">
                    {feature.title}
                  </h3>
                </div>
                {expandedFeature === index ? (
                  <ChevronUp className="w-7 h-7 text-orange-200" />
                ) : (
                  <ChevronDown className="w-7 h-7 text-gray-200" />
                )}
              </div>
              <div
                className={`mt-2 text-gray-400 transition-all duration-300 overflow-hidden ${
                  expandedFeature === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {feature.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesTab;
