import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubscriptionVisible, setIsSubscriptionVisible] =
    React.useState(false);

  const navItems = [
    { label: "HOME", to: "/" },
    { label: "WHO WE ARE", to: "/about" },
    { label: "BEHIND HEALTHISM", to: "/satvik-pandey" },
    { label: "CLASSES", to: "/classes" },
  ];
  const navigate = useNavigate();
  const handleJoinUs = () => {
    navigate("/contact");
  };

  React.useEffect(() => {
    const subscriptionSection = document.getElementById("subscription-section");
    if (!subscriptionSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsSubscriptionVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(subscriptionSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="w-full bg-transparent text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-bold text-2xl tracking-wider">
              <img
                className="h-[8rem] w-auto sm:h-[6rem]"
                src="https://res.cloudinary.com/dkhwvrr2w/image/upload/v1737615155/udz5qhgjlpoh7aywyyqp.png"
                alt="Healthism"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-white hover:text-orange-500 transition-colors duration-200 text-md font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {!isSubscriptionVisible && (
            <button
              onClick={handleJoinUs}
              className="hidden md:inline-block text-white text-md font-bold transition-colors duration-200 border-2 px-4 py-2 rounded-md bg-orange-600 border-transparent hover:border-orange-500 hover:bg-transparent hover:text-orange-500"
            >
              JOIN US
            </button>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
              className="text-white p-2 hover:text-orange-600 transition-all"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transform ${
            isOpen ? "scale-100" : "scale-0"
          } origin-top-right transition-transform duration-300`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-md rounded-md">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="block px-3 py-2 text-black hover:text-orange-600 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/subscriptions"
              className="block px-3 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-500"
              onClick={() => setIsOpen(false)}
            >
              CONTACT
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
