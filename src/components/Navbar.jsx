import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/healthism.png";

const NavbarLayout = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSubscriptionVisible, setIsSubscriptionVisible] =
    React.useState(false);

  const navItems = [
    { label: "WHO WE ARE", to: "/about" },
    { label: "BEHIND HEALTHISM", to: "/satvik-pandey" },
    { label: "CLASSES", to: "/classes" },
  ];

  const navigate = useNavigate();

  const handleJoinUs = () => {
    navigate("/contact");
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className=" flex flex-col">
        <nav
          className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled ? "py-2" : "py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center backdrop-blur-lg   shadow-lg rounded-full px-2 py-2 bg-black/30">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="font-bold text-2xl tracking-wider">
                  <img
                    className="w-auto h-[2rem]"
                    src={logo}
                    alt="Healthism"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="text-white hover:text-orange-400 transition-all duration-200 text-md font-medium relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-200 group-hover:w-full" />
                  </Link>
                ))}

                <button
                  onClick={handleJoinUs}
                  className="text-white text-md font-bold px-6 py-2 rounded-full
                           border-2 border-orange-400 hover:bg-orange-400 
                           transition-all duration-300 transform hover:scale-105"
                >
                  JOIN US
                </button>
              </div>

              {/* Mobile menu button */}

              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white p-2 hover:text-orange-400 transition-all"
                  aria-label="Toggle navigation menu"
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
            <div className=" flex items-center ">
              <div
                className={`md:hidden absolute w-full left-0 top-full transition-all duration-300 transform ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 opacity-0 pointer-events-none"
                }`}
              >
                <div className="mr-4 p-4 ml-4 backdrop-blur-lg bg-black/30 rounded-3xl shadow-lg">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="block py-2 text-white hover:text-orange-400 text-sm font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    to="/contact"
                    className="block mt-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-full text-center hover:bg-orange-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    JOIN US
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content container */}
        <main className="flex-grow pt-32 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default NavbarLayout;
