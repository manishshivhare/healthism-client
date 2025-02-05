import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { subscriptionPlans } from "../content/siteContent";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHeaderVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (plan) => {
    navigate("/contact", {
      state: {
        selectedPlan: plan,
      },
    });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black  text-white">
      {/* Navbar */}
      <div className="fixed top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className=" flex flex-col justify-center items-center bg-black text-center px-6 pt-20">
        <div
          ref={headerRef}
          className={`text-center mb-10 sm:mb-12 transform transition-all duration-1000 ${
            headerVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
          data-aos="fade-up" // AOS animation for header
        >
          <h2 className="text-[3rem] sm:text-[2.5rem] lg:text-[5rem] font-bold text-transparent tracking-wide relative font-outline-2">
            <span className="absolute inset-0 text-gray-800 font-extrabold tracking-wider text-[2rem] sm:text-[1rem] lg:text-[8rem] opacity-10 select-none ">
              MEMBERSHIPS
            </span>
            CHOOSE YOUR{" "}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline "
            >
              PLAN
            </a>
          </h2>
        </div>
        <p className="text-lg md:text-xl mb-8 max-w-3xl">
          Get fit and healthy with the best gym in town. Choose your plan and
          get started today!
        </p>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 px-6 bg-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan, index) => (
            <div
              key={plan.name}
              className="bg-gray-900 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 flex flex-col"
              data-aos={
                index === 1
                  ? "fade-up"
                  : index === 0
                  ? "fade-right"
                  : "fade-left"
              }
            >
              <img
                src={plan.image}
                alt={`${plan.name} image`}
                className="w-full h-48 md:h-60 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/default-plan.jpg";
                }}
              />
              <h3 className="text-2xl font-semibold text-orange-500 mb-4">
                {plan.name}
              </h3>
              <p className="text-gray-300 text-base md:text-lg mb-4">
                {plan.description}
              </p>
              {/* <div className="text-3xl font-bold text-orange-500 mb-4">
                ${plan.price} / month
              </div> */}
              <ul className="list-disc pl-5 mb-4 text-gray-400 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={`${plan.name}-feature-${i}`}>{feature}</li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan)}
                className="w-full bg-orange-500 text-black py-3 rounded-full text-lg hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
                aria-label={`Subscribe to ${plan.name}`}
              >
                ASK QUERY
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SubscriptionPage;
