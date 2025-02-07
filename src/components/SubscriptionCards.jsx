import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { plans } from "../content/siteContent.js";

const SubscriptionCard = () => {
  const [activeTab, setActiveTab] = useState("MONTHLY");
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
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

  const handleNavigate = () => {
    navigate("/contact", { state: { selectedPlan: plans[activeTab] } });
  };

  return (
    <div
      className="w-full p-6 bg-gradient-to-br from-black via-gray-900 to-black   pt-10"
      id="subscription-section"
    >
      <div className="text-center mb-10">
        <div className="max-w-7xl mx-auto text-center">
          {/* Header Section */}
          <div
            ref={headerRef}
            data-aos="fade-up"
            className={`text-center mb-3  pb-10 sm:mb-12 transform transition-all duration-1000 ${
              headerVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-transparent tracking-wide relative font-outline-2">
              CHOOSE YOUR{" "}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                PLAN
              </a>
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.keys(plans).map((planName) => (
              <button
                key={planName}
                onClick={() => setActiveTab(planName)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  activeTab === planName
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {planName}
              </button>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl overflow-hidden bg-zinc-900 transition-transform duration-300 border-b border-gray-600">
            <div className="relative text-white">
              <img
                src={plans[activeTab].image}
                alt={`${plans[activeTab].name} plan`}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-4 left-4 text-orange-500 font-bold text-lg uppercase">
                HealthismPass {plans[activeTab].name}
              </div>
            </div>

            <div className="p-6 bg-gray-800">
              <h3 className="text-2xl text-white font-bold mb-4">
                {plans[activeTab].description}
              </h3>
              <ul className="space-y-3 mb-6">
                {plans[activeTab].features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-orange-500 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleNavigate}
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-bold"
              >
                ASK QUERY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
